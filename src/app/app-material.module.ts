import { NgModule } from '@angular/core';
import { MatIconModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatCardModule, MatButtonModule, MatMenuModule } from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule
    ],
    exports: [
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule
    ]
})
export class AppMaterialModule {}