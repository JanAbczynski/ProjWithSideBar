
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Competition } from '../../../models/Competition';
import { TargetModel } from '../../../models/Target/TargetModel';
import { TargetSizes } from '../../../models/Target/TargetSizes';
import { ShootingRangeService } from '../../../services/shooting-range.service';
import { Guid } from "guid-typescript";
import { PointModel } from '../../../models/Target/PointModel';
import { CommonServiceService } from '../../../services/common-service.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-target-create',
  templateUrl: './target-create.component.html',
  styleUrls: ['./target-create.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TargetCreateComponent implements OnInit {
  afuConfig = {
    uploadAPI: {
      url:"https://example-file-upload-api"
    }
};

  constructor(
    private shootingRangeService: ShootingRangeService,
    private commonService: CommonServiceService,
    private route: ActivatedRoute,
    private router: Router ) { }

  selectedFile: File | any= null;
  fileLoader: boolean = false;
  fileName: any = {};
  targetModel: TargetModel = {NewSize: {}, NewPoint: {}}
  signup = new FormGroup({
    email: new FormControl(null, Validators.required),
    image: new FormControl(null, [Validators.required])
  });

  dafouulltValues: PointModel [] = [
    {Value: 10, Special: true, AllowToRemove: true},
    {Value: 10, Special: false, AllowToRemove: true},
    {Value: 9, Special: false, AllowToRemove: true},
    {Value: 8, Special: false, AllowToRemove: true},
    {Value: 7, Special: false, AllowToRemove: true},
    {Value: 6, Special: false, AllowToRemove: true},
    {Value: 5, Special: false, AllowToRemove: true},
    {Value: 4, Special: false, AllowToRemove: true},
    {Value: 3, Special: false, AllowToRemove: true},
    {Value: 2, Special: false, AllowToRemove: true},
    {Value: 1, Special: false, AllowToRemove: true}
  
  ]

  
  id : string | any;
  edit: boolean = false;

  submit(){

  }

  fileSelected(file: any){
    console.log(file);
  }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); 
    if(this.id != null){
      this.GetTarget(this.id);
      this.edit = true;
    }else{
      this.StartValues();
    }
    
  }

  StartValues(){
    for(let i = 0; i < this.dafouulltValues.length; i ++){
      this.targetModel.NewPoint = this.dafouulltValues[i];
      this.AddPoints();
    }
    
  }

  GetTarget(id: string){
    this.shootingRangeService.GetTarget(id)
    .subscribe({
      next: ((value: any) => {

        this.targetModel.AttachmentFile = {};
        this.targetModel.Id = value.Id;
        this.targetModel.Name = value.Name;
        this.targetModel.Points = value.Points;
        this.targetModel.Size = value.Size;
        this.targetModel.AllowToChange = value.AllowToChange;
        this.targetModel.IsActive = value.IsActive;
        this.targetModel.IsPublic = value.IsPublic;
        if(value.AttachmentFile != undefined){
          this.targetModel!.AttachmentFile = {}
          this.targetModel.AttachmentFile! = value.AttachmentFile;
          this.targetModel.AttachmentFile!.FullName = value.AttachmentFile.NewName + value.AttachmentFile.Extension;
        }
        
      }),
      error: ((value: any) => {
        console.log(value);
        // this.commonService.ShowError(value.error, "Błąd pobierania danych");
        this.router.navigate(['/targets/list/'])
      })
      }
    )
  }

  Submit(){


    if(this.edit){
      this.AskForEditTarget();
    }else{
      this.AddTarget();
    }
  }


  AskForCopyTarget(){
    this.commonService.OpenYesNo("Czy chcesz utworzyć kopię tarczy?", null)
    .subscribe(
      result =>{
          if(result.answer){
            this.CopyTarget();
          }
        }
    )
  }

  CopyTarget(){
    this.shootingRangeService.CopyTarget(this.targetModel.Id)
    .subscribe({
      next: ((value: any) => {
        this.commonService.ShowSuccess(value, "");
        this.router.navigate(['/targets/list/']);
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "");
      })
      }
    )
  }





  AskForDeleteOneTarget(){
    this.commonService.OpenYesNo("Czy chcesz bezpowrotnie usunąć tarczę?", null)
    .subscribe(
      result =>{
          if(result.answer){
            this.DeleteTarget();
          }
        }
    )
  }

  DeleteTarget(){
    this.shootingRangeService.DeleteTarget(this.targetModel.Id)
    .subscribe({
      next: ((value: any) => {
        this.commonService.ShowSuccess(value, "");
        this.router.navigate(['/targets/list/']);
      }),
      error: ((value: any) => {
        this.commonService.ShowError("Tarcza jest używana w niektóych wydarzeniach. Wpierw odepinij tarczę aby ją usunąć lub oznacz ją jako nieaktywną", value.error, 10000);
      })
      }
    )
  }






  AskForEditTarget(){
    this.commonService.OpenYesNo("Czy chcesz zaktualizować tarczę?", null)
    .subscribe(
      result =>{
          if(result.answer){
            this.EditTarget();
          }
        }
    )
  }


  EditTarget(){
    this.shootingRangeService.EditTarget(this.targetModel)
    .subscribe({
      next: ((value: any) => {
        this.commonService.ShowSuccess("Zaktualizowano tarczę", "");
        this.ngOnInit();
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "");
        this.ngOnInit();
      })
      }
    )
  }

  AddTarget(){
    this.shootingRangeService.AddTarget(this.targetModel)
    .subscribe({
      next: ((value: any) => {

        this.commonService.ShowSuccess("Zapisano cel", "")
        this.router.navigate(['/targets/list/'])
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "")
      })
      }
    )
  }

  onFileSelected(event: any){
    
    if(event.target.files[0] != null){ 

      this.selectedFile = <File>event.target.files[0];

      this.AddFile(this.selectedFile);

    }
  }

  OnSubmitCreateSR(){

  }

  ReturnToList(){
    this.router.navigate(['/targets/list/'])
  }

  SetActive(){
    this.shootingRangeService.SetActive(this.targetModel.Id!)
    .subscribe({
      next: ((value: any) => {
        this.commonService.ShowSuccess(value.Message_2, value.Message)
        this.ngOnInit();
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "")
      })
      }
    )

  }

  AddSize(){

    let size: TargetSizes = {};
    if(this.targetModel.Size == undefined){
      let sizeArray: TargetSizes[] = [];
      this.targetModel.Size = sizeArray;
    }
    this.targetModel.Size.push(size);
  }

  RemoveSize(index: number){
    let newList: TargetSizes[] = [];
    for(let i = 0; i < this.targetModel.Size!.length; i ++){
      if(index != i){
        newList.push( this.targetModel.Size![i]);
      }     
    }
    this.targetModel.Size = newList;
  }

  removeSize2(id: any){
    let tempList = [];
    for(let i = 0; i < this.targetModel.Size!.length; i ++){
      if(this.targetModel.Size![i].Id != id){
        tempList.push(this.targetModel!.Size![i]);
      }
    }

    this.targetModel.Size = tempList;
  }

  AddSize2(){
    if((this.targetModel.NewSize!.SizeX == 0 || this.targetModel.NewSize!.SizeX == undefined) ||
       (this.targetModel.NewSize!.SizeY == 0 || this.targetModel.NewSize!.SizeY == undefined)){
         return
       }


    if(this.targetModel.Size == undefined){
      let sizeArray: TargetSizes[] = [];
      this.targetModel.Size = sizeArray;
    }

    for(let i =0; i < this.targetModel.Size.length; i++){
      if(this.targetModel.Size[i].SizeX == this.targetModel.NewSize!.SizeX &&
        this.targetModel.Size[i].SizeY == this.targetModel.NewSize!.SizeY){
        this.commonService.ShowInfo("Ta wartość jest już na liście", "")
        return
      }
    }


    this.targetModel.NewSize!.Id = Guid.create().toString();
    this.targetModel.Size.push(this.targetModel.NewSize!);
    this.targetModel.NewSize = {};
  }

  AddPoints(){


    if(this.targetModel.NewPoint != null){

      if(this.targetModel.NewPoint.Value == null){
        return
      }

      let id = Guid.create().toString();
      this.targetModel.NewPoint.Id = id;
      this.targetModel.NewPoint.AllowToRemove = true;
      if(this.targetModel.Points == undefined){ 
        let pointsArray: PointModel[] = [];
        this.targetModel.Points = pointsArray;
      }

      for(let i =0; i < this.targetModel.Points.length; i++){
        if(this.targetModel.Points[i].Value == this.targetModel.NewPoint.Value &&
          this.targetModel.Points[i].Special == this.targetModel.NewPoint.Special){
          this.commonService.ShowInfo("Ta wartość jest już na liście", "")
          return
        }
      }

      let point = {...this.targetModel.NewPoint};
      this.targetModel.Points.push(point);
      console.log(this.targetModel)


      if(this.targetModel.Points != undefined){
  
        let sorted = this.targetModel.Points.sort((a,b) => {
          if ((b.Special ?? 0) < (a.Special ?? 0)) return 1;
          if ((b.Special ?? 0) > (a.Special?? 0)) return -1;
          return 0;
        });  

        sorted = sorted.sort((a,b) => {
          if ((b.Value ?? 0) < (a.Value ?? 0)) return 1;
          if ((b.Value ?? 0) > (a.Value?? 0)) return -1;
          return 0;
        });
  
        this.targetModel.Points  = sorted
      }
    }

    this.targetModel.NewPoint = {};
  }



  removePoint(Id: any){
    let tempList = [];
    for(let i = 0; i < this.targetModel.Points!.length; i ++){

      if(this.targetModel.Points![i].Id == Id && !this.targetModel.Points![i].AllowToRemove){
        tempList.push(this.targetModel!.Points![i]);
        this.commonService.ShowError("Punkt jest używany w innym wydarzeniu","Nie można usunąć punktu", 5000);
      }

      if(this.targetModel.Points![i].Id != Id){
        tempList.push(this.targetModel!.Points![i]);
      }
    }

    this.targetModel.Points = tempList;
  }

  AddFile(file: File) {
    this.fileLoader = true;
    let formData = new FormData();
    formData.append('TargetImage2', file, file.name);
    console.log(formData);
    console.log(file);

          this.shootingRangeService.UploadFile(formData)
          .subscribe({
            next: ((value: any) => {
              this.targetModel.File = {};
              this.targetModel.File.FileUrl = value.NewName + value.Extension;
              this.targetModel.File.OriginalName = value.OriginalName;
              this.targetModel.File.Id = value.Id;



              this.targetModel.AttachmentFile = {};
              this.targetModel.AttachmentFile.NewName = value.NewName;
              this.targetModel.AttachmentFile.Extension = value.Extension;
              this.targetModel.AttachmentFile.FullName = value.NewName + value.Extension;
              this.targetModel.AttachmentFile.Id = value.Id;
              this.targetModel.AttachmentFile.OriginalName = value.OriginalName;
              this.targetModel.AttachmentFile.Folder = value.Folder;



              
              this.fileLoader = false;
            }),
            error: ((value: any) => {
              this.commonService.ShowError(value.error, "")
              this.fileLoader = false;
            })
            }
          )
  }

  RemoveFile(Id: any){
    this.shootingRangeService.RemoveTempFile(Id)
    .subscribe({
      next: ((value: any) => {
        this.targetModel.AttachmentFile = undefined;
        this.commonService.ShowInfo("Usunięto plik", "")
      }),
      error: ((value: any) => {
        if(value.status != 409){
          this.targetModel.AttachmentFile = undefined;
        }
        
        this.commonService.ShowError(value.error.message_2, value.error.message)
      })
      }
    )
  }
}



