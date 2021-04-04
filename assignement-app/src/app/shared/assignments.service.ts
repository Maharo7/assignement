import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments: Assignment[];
  constructor(private loggingservice:LoggingService,private http:HttpClient) { } 
  uri = "http://localhost:8010/api/assignments";

  getAssignments():Observable<Assignment[]>{
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignment(id:number): Observable<Assignment> {
   /* console.log(id + "id serv")
    let assignmentSearch = this.assignments.find(a =>a.id===id);
    console.log(assignmentSearch.nom);
    return of(assignmentSearch);*/
    return this.http.get<Assignment>(this.uri+"/"+id);

  }
  addAssignment(assignment:Assignment):Observable<Object>{
    assignment.id=this.generateId();
   /* this.assignments.push(assignment);*/
   const headers = new HttpHeaders()
   .set('Content-Type', 'application/json');
    return this.http.post(this.uri,assignment);

  }

  generateId(): number {
  return Math.round(Math.random()*100000);  
  }

  updateAssignment(assignment:Assignment):Observable<String>{
    return of("Assignment successfully modified");
  }

  deleteAssignment(assignment:Assignment):Observable<Object>{
    console.log("ito "+assignment.id);
   return this.http.delete(this.uri+"/"+assignment.id);
    //return of("Assignment successfully delete");
     
  }
}