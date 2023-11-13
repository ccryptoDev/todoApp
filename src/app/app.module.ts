import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { taskReducer } from './reducers/task.reducer';
import { TaskEffects } from './effects/task.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export interface Task {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface TaskState {
  tasks: Task[];
}

export interface AppState {
  taskFeature: TaskState;
}

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ taskFeature: taskReducer }),
    EffectsModule.forRoot([TaskEffects]),
    AppRoutingModule,
    FormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
