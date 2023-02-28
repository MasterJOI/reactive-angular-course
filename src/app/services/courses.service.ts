import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {map, shareReplay} from "rxjs/operators";
import {Lesson} from "../model/lesson";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient
  ) { }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`/api/lessons`, {
      params: {
        filter: search,
        pageSize: "10"
      }
    }).pipe(
      map(res => res["payload"]),
      shareReplay()
    );
  }

  loadCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`).pipe(
      shareReplay()
    );
  }

  loadCAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`/api/lessons`, {
      params: {
        courseId: courseId.toString(),
        pageSize: "1000"
      }
    }).pipe(
      map(res => res["payload"]),
      shareReplay()
    );
  }
}
