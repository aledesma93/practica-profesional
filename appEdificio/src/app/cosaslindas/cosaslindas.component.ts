import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { addDoc, collection, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { Foto } from '../Entidades/foto';
import { cosasLindas, db, FirestoreService } from '../Servicios/firestore.service';
import { PhotoService } from '../Servicios/photo.service';



@Component({
  selector: 'app-cosaslindas',
  templateUrl: './cosaslindas.component.html',
  styleUrls: ['./cosaslindas.component.scss'],
})

export class CosaslindasComponent implements OnInit 
{

  @ViewChild(IonInfiniteScroll) infiniteScroll: CosaslindasComponent;

  constructor(private routerRecieved:Router, public photoSrv:PhotoService, public authSrv:FirestoreService ) {}

  publicacionesCosasLindas:any;

  spinnerMostrandose = true;

  async ngOnInit() 
  {
    //--------SPINNER----------------------------------------------
    setTimeout( ()=> { this.spinnerMostrandose = false}, 2000);
    //-

    this.publicacionesCosasLindas = await this.photoSrv.leerDBCosasLindas();

    console.log(this.publicacionesCosasLindas);
  }
  
  flagLoadingPublicaciones = true;

  async subirFoto()
  {
    await this.photoSrv.addNewToGallery();  
    this.publicacionesCosasLindas = await this.photoSrv.leerDBCosasLindas();
    // this.refrescarFotos();
  }

  volver()
  {
    this.routerRecieved.navigate(['/loged']);   
  }

 

  votarImagen(foto : any, dislike : any)
  {
 
    if(!dislike)
    {
      foto.likes.push(this.authSrv.userLogedmail);
    }
    else
    {
      foto.likes = foto.likes.filter((like : string)=>like != this.authSrv.userLogedmail);
    }

    console.log(foto);
    console.log(foto.id);
    this.photoSrv.modificarImagen(foto);

  }


}
