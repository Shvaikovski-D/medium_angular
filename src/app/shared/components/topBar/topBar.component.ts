import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { CurrentUserInterface } from '../../types/currentUser.interface';

@Component({
  selector: 'mc-topbar',
  templateUrl: './topBar.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class TopBarComponent {
  data$: Observable<{
    currentUser: CurrentUserInterface | null | undefined;
  }>;

  constructor(private store: Store) {
    this.data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser),
    });
  }
}
