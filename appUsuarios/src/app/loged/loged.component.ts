import { Component, OnInit } from '@angular/core';

import { getAuth, signOut } from "firebase/auth";
import { HomePage } from '../home/home.page';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { FirestoreService } from '../Servicios/firestore.service';

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html',
  styleUrls: ['./loged.component.scss'],
})
export class LogedComponent implements OnInit {

  rango = "Usuario";

  public usuariosLeidos:any;
  public usuariosLeidosOrdenados:any;

  constructor(private routerRecieved:Router, public srvFirebase:FirestoreService) 
  {}
  
  spinnerMostrandose = true;
  mostrarBotonAgregar = false;
  async ngOnInit() 
  {
    //--------SPINNER----------------------------------------------
    setTimeout( ()=> { this.spinnerMostrandose = false}, 2000);
    //-------------------------------------------------------------
    this.verificarUsuario();

    const auth = getAuth();  

    this.usuariosLeidos = await this.srvFirebase.leerDBUsuarios();
    this.usuariosLeidosOrdenados = this.usuariosLeidos.sort( (a,b)=> { if(a.nombre > b.nombre){return 1;}else{return -1}});
  }


  logOut()
  {
    const auth = getAuth();
    signOut(auth).then(() => 
    {
   
      this.routerRecieved.navigate(['/home']);

    }).catch((error) => 
    {
      // An error happened.
      console.log(error);
    });
  }
  verificarUsuario() {
    const auth = getAuth();
    const usuarioActual = auth.currentUser;
    if (usuarioActual && usuarioActual.email) {
      if (usuarioActual.email === "admin@admin.com") {
        this.mostrarBotonAgregar = true;
        this.rango = 'Administrador';
      }else {
        this.rango = 'Usuario'; // Mantener como "Usuario" para otros
      }
    }
  }
  goToAltaUser()
  {
    this.routerRecieved.navigate(['/altausuario']);
  }
  
}
