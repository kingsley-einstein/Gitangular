import { NgModule } from '@angular/core';
import { MatIconModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatCardModule, MatButtonModule, MatMenuModule, MatSnackBarModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule
    ],
    exports: [
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule
    ]
})
export class AppMaterialModule {}