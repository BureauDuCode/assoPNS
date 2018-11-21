import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Router, RoutesRecognized} from "@angular/router";
import {PopupService} from "../../services/popup.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    connectedUser: User;

    currentRoute: string;

    mobileMenuOpened: boolean;
    displayAssosPages: boolean;

    loading = true;

    constructor(private userService: UserService, private popupService: PopupService, private ref: ChangeDetectorRef,
                private route: Router) {
        this.currentRoute = '';
        this.mobileMenuOpened = false;
        this.displayAssosPages = false;
    }

    async ngOnInit() {
        this.loading = false;
        console.log("finished loading");


        this.route.events.subscribe(event => {
            if (event instanceof RoutesRecognized) {
                this.currentRoute = event.url;
            }
        });
        // this.ref.reattach();
        // console.log(await this.userService.getLoggedUser());
        this.userService.getLoggedUser().subscribe(user => {
            this.connectedUser = user;
            console.log(user);
            // this.ref.detectChanges();
        });
        // Open popup to inform of cookie using
        if (localStorage.getItem("knowCookies") !== 'true') {
            setTimeout(() => {
                // Must open only if the user never said ok
                this.popupService.openCookiePopup();
            }, 1500);
        }
    }

    disconnect() {
        this.userService.disconnectUser();
    }
}
