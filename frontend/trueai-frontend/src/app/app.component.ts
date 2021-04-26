import { Component } from '@angular/core';
import * as editor from './ckeditor5/build/ckeditor';import { FormControl } from '@angular/forms';
;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trueai-frontend';

  public Editor = editor;


  public editorControl = new FormControl('', null);

  public inputData: string = "Oix"

  itemsArray = [
    // (...)
    { id: 1703, name: 'Mentions plugin', type: 'feature' },
    { id: 1751, name: 'Autocomplete plugin', type: 'feature' },
    { id: 1746, name: 'Emoji plugin', type: 'feature' },
    { id: 2062, name: 'Emoji list button', type: 'feature' }
    // (...)
];

// Returns (through its callback) the suggestions for the current query.
 dataCallback = ( matchInfo, callback ) => {
    // Remove the '#' tag.
    console.log('Recebi na callback: ', matchInfo);
    var query = matchInfo.query.substring( 1 );

    // Simple search.
    // Filter the entire items array so only the items that start
    // with the query remain.
    var suggestions = this.itemsArray.filter( function( item ) {
        return String( item.id ).indexOf( query ) == 0;
    } );

    // Note: The callback function can also be executed asynchronously
    // so dataCallback can do an XHR request or use any other asynchronous API.
    callback( suggestions );
}


  textTestCallback = (range)=> {
    if ( !range.collapsed ) {
      return null;
    }
  return this.Editor.plugins.textMatch.match( range, this.matchCallback );
  }

  matchCallback = ( text, offset ) => {
   
    // Get the text before the caret.
    var left = text.slice( 0, offset ),
        // Will look for a '#' character followed by a ticket number.
        match = left.match(/#\d*$/);

    if ( !match ) {
        return null;
    }
    return { start: match.index, end: offset };
  }


  public config = {
    toolbar: ['heading', '|', 'bold', 'italic', 'custombutton'],
    language: 'en',
    textTestCallback : this.textTestCallback,
    dataCallback: this.dataCallback
  }

  

  public onReady( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }

  public onChange($event) {
    console.log('Change with event: ', $event);
    console.log('Variable has value: ', this.inputData);
  }

  // constructor() {
  //   new editor.plugins.autocomplete(this.Editor, this.config);
  // }


}
