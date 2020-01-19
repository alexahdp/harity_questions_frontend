import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store/app-store.module";
import { LoginUser, SetCurrentUser, SetInitialUser } from './store/actions/auth.action';
import { AuthDTO } from './models/auth';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "harity-questions-frontend";

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new SetInitialUser())
    // this.store.dispatch(new LoginUser(<AuthDTO>{
    //   username: 'username',
    //   password: 'password',
    // }));
  }
}
