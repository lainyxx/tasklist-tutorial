import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, ActionSheetController, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonList, IonItem, IonLabel]
})
export class TasklistPage implements OnInit {
  tasks: { name: string }[] = [
    { name: 'タスク1' },
    { name: 'タスク2' },
  ];
  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
  ) {
    addIcons({ trashOutline, createOutline, closeOutline});
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if ('tasks' in localStorage) {
      this.tasks = JSON.parse(localStorage.tasks);
    } 
  }

  async changeTask(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'タスクの変更',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            console.log('Destructive clicked');
            this.tasks.splice(index, 1);
            localStorage.tasks = JSON.stringify(this.tasks);
          }
        }, {
          text: '変更',
          icon: 'create-outline',
          handler: () => {
            console.log('Archive clicked');
            this._renameTask(index);
          }
        }, {
          text: '閉じる',
          role: 'cancel',
          icon: 'close-outline',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
      ]
    });
    actionSheet.present();
  }

  async _renameTask(index: number) {
    const prompt = await this.alertController.create({
      header: '変更後のタスク',
      inputs: [
        {
          name: 'task',
          placeholder: 'タスク',
          value: this.tasks[index].name
        },
      ],
      buttons: [
        {
          text: '閉じる'
        },
        {
          text: '保存',
          handler: data => {
            this.tasks[index] = {name: data.task};
            localStorage.tasks = JSON.stringify(this.tasks);
          }
        }
      ]
    });
    prompt.present();
  }
}
