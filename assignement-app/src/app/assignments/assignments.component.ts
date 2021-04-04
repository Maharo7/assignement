import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments:Assignment[];

  // on injecte le service de gestion des assignments
  constructor(private assignmentsService:AssignmentsService) {}

  ngOnInit() {
    console.log('AVANT AFFICHAGE');

    // on utilise le service pour récupérer les
    // assignments à afficher
    this.assignmentsService.getAssignments()
      .subscribe(assignments => {
        this.assignments = assignments;
        console.log("données reçues");
      });
      console.log("getAssignments() du service appelé");
  }

  onDeleteAssignment(event) {
    // event = l'assignment à supprimer

    //this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event)
      .subscribe(message => {
        console.log(message);
      })
  }
}
