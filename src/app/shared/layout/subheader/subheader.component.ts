import { Component } from '@angular/core';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent {
  subItems = [
    {
      type: 'main assets',
      range: 58,
      icon: 'assets/images/icons/airforce-assets.png',
      class: 'active'
    },
    {
      type: 'support asset',
      range: 67,
      icon: 'assets/images/icons/support-assets.png',
      class: ''
    },
    {
      type: 'ordnance',
      range: 90,
      icon: 'assets/images/icons/ordinance.png',
      class: ''
    },
    {
      type: 'logistic',
      range: 60,
      icon: 'assets/images/icons/logistic.png',
      class: ''
    },
    {
      type: 'human resource',
      range: 40,
      icon: 'assets/images/icons/human-resource.png'
    }
  ];
  ngOnInit() {}
}
