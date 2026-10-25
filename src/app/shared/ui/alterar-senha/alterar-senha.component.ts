import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alterar-senha.component.html',
  styleUrl: './alterar-senha.component.css',
})
export class AlterarSenhaComponent {
  private readonly fb = inject(FormBuilder);

  @Input() salvando = false;
  @Input() mensagem = '';
  @Input() erro = '';
  @Output() salvar = new EventEmitter<string>();

  mostrar = false;
  readonly form = this.fb.group({
    nova: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]],
    confirmar: ['', Validators.required],
  });

  get diferente(): boolean {
    const { nova, confirmar } = this.form.value;
    return !!confirmar && nova !== confirmar;
  }

  enviar(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.diferente) return;
    this.salvar.emit(this.form.value.nova!);
  }

  limpar(): void { this.form.reset(); }
}
