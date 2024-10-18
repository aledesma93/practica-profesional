import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../Servicios/firestore.service';
import { PhotoService } from '../Servicios/photo.service';

@Component({
  selector: 'app-cosasfeas',
  templateUrl: './cosasfeas.component.html',
  styleUrls: ['./cosasfeas.component.scss'],
})
export class CosasfeasComponent implements OnInit
{
  constructor(private routerRecieved:Router, public photoSrv:PhotoService, public authSrv:FirestoreService ) {}

  publicacionesCosasFeas:any;

  spinnerMostrandose = true;

  async ngOnInit() 
  {
    //--------SPINNER----------------------------------------------
    setTimeout( ()=> { this.spinnerMostrandose = false}, 2000);
    //-

    this.publicacionesCosasFeas = await this.photoSrv.leerDBCosasFeas();

    console.log(this.publicacionesCosasFeas);
  }
  
  flagLoadingPublicaciones = true;

  async subirFoto()
  {
    await this.photoSrv.addNewToGalleryFea();  
    // this.refrescarFotos();
    this.publicacionesCosasFeas = await this.photoSrv.leerDBCosasFeas();
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
    this.photoSrv.modificarImagenFea(foto);

  }

}
