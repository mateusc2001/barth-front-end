import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {TipoContaEnum} from "./enum/tipo-conta.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public folders = [
    {
      name: 'Home',
      iconName: 'home',
      routerLink: '/home'
    },
    {
      name: 'Enviar extratos',
      iconName: 'cloud_upload',
      routerLink: '/upload-file'
    },
    {
      name: 'Extratos pendentes',
      iconName: 'description',
      routerLink: '/extratos-pre-aprovados'
    },
    {
      name: 'Contas a pagar',
      iconName: 'money_off',
      tipoContaEnum: TipoContaEnum.A_PAGAR,
      routerLink: '/contas-a-pagar'
    },
    {
      name: 'Contas a receber',
      iconName: 'attach_money',
      tipoContaEnum: TipoContaEnum.A_RECEBER,
      routerLink: '/contas-a-receber'
    },
    {
      name: 'Cadastro cliente',
      iconName: 'person_add',
      routerLink: '/cadastro-cliente'
    },
    {
      name: 'Caixa',
      iconName: 'person_add',
      routerLink: '/caixa'
    },
    {
      name: 'Despesas de carros',
      iconName: 'directions_car',
      routerLink: '/despesas-auto'
    }
  ];

  title = 'barth-automoveis-financeiro';
  public url: any = 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg';
  public usuarioLogado: any = {
    id: -1,
    nomeCompleto: 'Não informado'
  };

  constructor(private router: Router) { }

  @ViewChild('drawer')
  drawer!: MatSidenav;

  ngOnInit(): void {
    const obj = window.localStorage.getItem('ls.user');
    if (!!obj) {
      this.usuarioLogado = JSON.parse(obj);
    }
  }

  public showMainMenu(): boolean {
    const res = this.router.url === '/login';
    return res;
  }

  public onActivate(elementRef: any): void {
    if (!!elementRef.usuarioLogado) {
      elementRef.usuarioLogado.subscribe((event: any) => {
        this.usuarioLogado = event;
      });
    }
  }

  public logout(): void {
    this.router.navigate(['/login']);
  }

  public navigateHome(): void {
    this.router.navigate(['/home']);
  }

  public getContasVencimentoHojeStorage(tipoContaEnum: TipoContaEnum): any {
    const venc = window.localStorage.getItem('ls.contasVencimento');
    const response = venc ? JSON.parse(venc) : {
      contasPagarHoje: 1,
      contasReceberHoje: 2
    };
    const res =  tipoContaEnum === TipoContaEnum.A_RECEBER ? response.contasReceberHoje : response.contasPagarHoje;
    // console.log(res)
    return res;
  }

}
