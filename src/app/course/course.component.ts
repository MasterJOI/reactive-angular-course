import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {map, startWith, tap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {CoursesService} from "../services/courses.service";

interface CourseData {
  course: Course;
  lessons: Lesson[];
}
@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  courseData$: Observable<CourseData>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    const courseId = +this.route.snapshot.paramMap.get("courseId");

    const course$ = this.coursesService.loadCourseById(courseId).pipe(
      startWith(null)
    );
    const lessons$ = this.coursesService.loadCAllCourseLessons(courseId).pipe(
      startWith([])
    );

    /*combineLatest - wait until all observers emit first value then
    whenever the course$ or lessons$ emits value, it will emmit the latest value*/
    /*to avoid first delay, we can pass startWith initial emitting value*/
    this.courseData$ = combineLatest([course$, lessons$]).pipe(
      map(([course, lessons]) => {
        return {
          course,
          lessons
        }
      }),
      tap(console.log)
    )
  }
}











