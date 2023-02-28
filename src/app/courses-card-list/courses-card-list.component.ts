import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Course} from "../model/course";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CourseDialogComponent} from "../course-dialog/course-dialog.component";
import {filter, tap} from "rxjs/operators";

@Component({
  selector: 'courses-card-list',
  template: `
    <mat-card *ngFor="let course of courses" class="course-card mat-elevation-z10">

      <mat-card-header>

        <mat-card-title>{{course.description}}</mat-card-title>

      </mat-card-header>

      <img mat-card-image [src]="course.iconUrl">

      <mat-card-content>
        <p>{{course.longDescription}}</p>
      </mat-card-content>

      <mat-card-actions class="course-actions">

        <button mat-button mat-raised-button color="primary" [routerLink]="['/courses', course.id]">
          VIEW COURSE
        </button>

        <button mat-button mat-raised-button color="accent"
                (click)="editCourse(course)">
          EDIT
        </button>

      </mat-card-actions>

    </mat-card>
  `,
  styleUrls: ['./courses-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesCardListComponent {

  @Input()
  courses: Course[] = [];

  @Output()
  private coursesChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog
  ) {
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      filter(value => !!value),
      tap(() => this.coursesChanged.emit())
    ).subscribe();
  }

}
