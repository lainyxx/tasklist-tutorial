import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar,IonInput, IonButtons, IonMenuButton, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonList } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonItem, IonInput, IonLabel, IonButton, IonList, NgFor, FormsModule],
})
export class FolderPage implements OnInit {
  title = "タスク登録";
  tasks: { name: string }[] = [
    { name: 'タスク1' },
    { name: 'タスク2' },
  ];
  task: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ionViewWillEnter() {
    if ('tasks' in localStorage) {
      this.tasks = JSON.parse(localStorage.tasks);
    } 
  }

  addTask() {
    this.tasks.push({
      name: this.task
    });
    localStorage.tasks = JSON.stringify(this.tasks);
    this.task = '';
  }

  ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
