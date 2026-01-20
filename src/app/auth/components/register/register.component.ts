import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { BackendErrorMessages } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component";

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages],
  selector: 'mc-register',
  templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
  data$: Observable<{
    isSubmitting: boolean;
    backendErrors: BackendErrorsInterface | null
  }>;
  protected form!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<{ auth: AuthStateInterface }>) {

    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });

    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {}

  /**
   * Handles form submission for user registration.
   * 
   * Logs the current form values to the console, constructs a registration request
   * object from the form data, and dispatches the register action to the store.
   * 
   * @returns {void}
   */
  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request: request }));
  }
}
