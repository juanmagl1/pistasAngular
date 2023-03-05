import { Component } from '@angular/core';
import { CalendarOption } from '@fullcalendar/angular/private-types';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { style } from '@angular/animations';

@Component({
  selector: 'app-select-pista',
  templateUrl: './select-pista.component.html'
})
export class SelectPistaComponent {
calendarOptions:CalendarOptions={
  initialView:'timeGridFourDay',
  plugins:[timeGridPlugin,interactionPlugin],
  selectable:true,
  dateClick: function(info) {
    alert('Clicked on: ' + info.dateStr);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('Current view: ' + info.view.type);
    // change the day's background color just for fun
    // info.dayEl.style.backgroundColor = 'red';
    console.log(info.dayEl);
    
  },
  views: {
    timeGridFourDay: {
      type: 'timeGrid',
      duration: { days: 4 },
      slotLabelFormat:{
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        meridiem: 'short',
  },
  allDayContent:false,
      slotMinTime:'12:00',
      slotMaxTime:'20:00'
    }
},
events:[
  {
    title:'Partido de liga',
    start:'2023-03-02 12:45:00',
    end:'2023-03-02 13:30:00',
    allday:false,
  }
],
eventColor:'red'
}

}
