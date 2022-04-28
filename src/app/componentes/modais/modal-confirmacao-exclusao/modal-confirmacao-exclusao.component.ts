import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao-exclusao',
  templateUrl: './modal-confirmacao-exclusao.component.html',
  styleUrls: ['./modal-confirmacao-exclusao.component.css']
})
export class ModalConfirmacaoExclusaoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  emitOnClose(at: boolean) {
    return at;
  }
}
