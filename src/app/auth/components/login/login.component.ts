import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { authActions } from '../../store/actions';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { BackendErrorMessages } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages],
})
export class LoginComponent {
  form!: FormGroup;
data$!: Observable<{ isSubmitting: boolean; backendErrors: BackendErrorsInterface | null }>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.nonNullable.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    }) as Observable<{ isSubmitting: boolean; backendErrors: BackendErrorsInterface | null }>;
  }

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: LoginRequestInterface = {
      user: this.form.getRawValue() as { email: string; password: string },
    };
    this.store.dispatch(authActions.login({ request }));
  }
}
