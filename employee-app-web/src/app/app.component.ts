import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeServiceService } from './service/employee-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AppComponent implements OnInit {

  constructor(
    private employeeServiceService: EmployeeServiceService,
    config: NgbModalConfig,
    public fb: FormBuilder,
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  public employees: any;
  public employee: any;
  public employeForm: FormGroup;

  ngOnInit(): void {
    this.getEmployes();
    this.employeForm = this.fb.group({
      fullName: [''],
      functionEmployee: ['']
    })

    this.employee = {
      fullName: '',
      functionEmployee: ''
    }
  }

  model = {
    left: true,
    middle: false,
    right: false
  };

  open(content) {
    this.modalService.open(content);
  }

  email = new FormControl('');
  updateEmail() {
    this.email.setValue('sonoojaiswal@javatpoint.com');
    alert("Eyyy");
  }

  public addEmployee(valSave: boolean, employee: any): any {
    if(valSave){
     this.employeeServiceService.deleteEmployee(employee).subscribe(res => {
       this.getEmployes();
    });
    }else{
      this.employee.fullName = this.employeForm.get("fullName").value;
      this.employee.functionEmployee = this.employeForm.get("functionEmployee").value;
      this.employeeServiceService.addEmployee(this.employee).subscribe(res => {
        this.getEmployes();
      }); 
    }
  }

  public getEmployes(): any {
    this.employeeServiceService.getEmployees()
      .subscribe(
        (data) => {
          this.employees = data;
          console.log(this.employees);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  public deleteEmployee(id: number): any {
    this.employee.id = id;
    this.employeeServiceService.deleteEmployee(this.employee).subscribe(res => {
      this.getEmployes();
    });
  }

  public updateEmployee(employee: any): any {
    this.employeForm.get("fullName").setValue(employee.fullName);
    this.employeForm.get("functionEmployee").setValue(employee.functionEmployee);
    this.addEmployee(true,employee);
  }

  public clearForm() : any{
    this.employeForm.reset();
  }

}  