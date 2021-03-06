import React, { Component } from 'react';
import Components from 'react';
import Dashboard, { addWidget } from 'react-dazzle';

// App components
import Header from './Header';
import EditBar from './EditBar';
import Container from './Container';
import CustomFrame from './CustomFrame';

// Widgets of the dashboard.
import TextWidget from './widgets/TextWidget';
import IframeWidget from './widgets/IframeWidget';

import TitleWidget from './widgets/TextWidget';
import ProfileWidget from './widgets/TextWidget';
import StoryTextWidget from './widgets/TextWidget';
import ImageWidget from './widgets/TextWidget';

// Services
import WidgetService from './services/WidgetService';

// We are using bootstrap as the UI library
// Removed for conflicts
//import 'bootstrap/dist/css/bootstrap.css';

// Default styes of dazzle.
import 'react-dazzle/lib/style/style.css';

// Our styles
import '../styles/custom.css';


const widgetService = new WidgetService();

class Dash extends Component {
  constructor(props) {
    super(props);

    //get iframe from server
    let iframeTypes = widgetService.getIframe();
    iframeTypes.then(iframes => {
      this.loadIframe(iframes);
      //get widget from server
      this.load();
    }, err => {
      //get widget from server
      this.load();
    })

    //set state
    this.state = {
      // Widgets that are available in the dashboard
      widgets: {
        "TitleWidget":{
            "title":"Titolo",
            "props":{
              "text":"Insert your title here...",
              "onSave": this.saveTextWidget.bind(this),
              "wid_key": "TitleWidget"
            },
            "type": TitleWidget
        },
        "SubtitleWidget":{
            "title":"Subtitle",
            "props":{
              "text":"Insert your subtitle here...",
              "size": "subtitle",
              "onSave": this.saveTextWidget.bind(this),
              "wid_key": "SubtitleWidget"
            },
            "type": TitleWidget
        },
        "ProfileWidget":{
            "title":"Profilo",
            "props":{
            },
            "type": ProfileWidget
        },
        "StoryTextWidget":{
            "title":"La Tua Storia",
            "props":{
              "text":"Tell your story here...",
              "onSave": this.saveTextWidget.bind(this),
              "wid_key": "StoryTextWidget"
            },
            "type": StoryTextWidget
        },
        "ImageWidget":{
            "title":"Immagine",
            "props":{
            },
            "type": ImageWidget
        },
        "FooterWidget":{
            "title":"Footer",
            "props":{
              "text":"Insert your footer here...",
              "size": "footer",
              "onSave": this.saveTextWidget.bind(this),
              "wid_key": "FooterWidget"
            },
            "type": TitleWidget
        },
        "GraficoWidget": {
          "type": IframeWidget,
          "title":"Grafico",
          "props":{
            "url": "http://localhost:8088/superset/explore/table/3/?form_data=%7B%22datasource%22%3A%223__table%22%2C%22viz_type%22%3A%22line%22%2C%22slice_id%22%3A20%2C%22granularity_sqla%22%3A%22ds%22%2C%22time_grain_sqla%22%3A%22Time+Column%22%2C%22since%22%3A%22100+years+ago%22%2C%22until%22%3A%22now%22%2C%22metrics%22%3A%5B%22sum__num%22%5D%2C%22groupby%22%3A%5B%22name%22%5D%2C%22limit%22%3A%2225%22%2C%22timeseries_limit_metric%22%3Anull%2C%22show_brush%22%3Afalse%2C%22show_legend%22%3Atrue%2C%22rich_tooltip%22%3Atrue%2C%22show_markers%22%3Afalse%2C%22x_axis_showminmax%22%3Atrue%2C%22line_interpolation%22%3A%22linear%22%2C%22contribution%22%3Afalse%2C%22x_axis_label%22%3A%22%22%2C%22x_axis_format%22%3A%22smart_date%22%2C%22y_axis_label%22%3A%22%22%2C%22y_axis_bounds%22%3A%5Bnull%2Cnull%5D%2C%22y_axis_format%22%3A%22.3s%22%2C%22y_log_scale%22%3Afalse%2C%22rolling_type%22%3A%22None%22%2C%22time_compare%22%3Anull%2C%22num_period_compare%22%3A%22%22%2C%22period_ratio_type%22%3A%22growth%22%2C%22resample_how%22%3Anull%2C%22resample_rule%22%3Anull%2C%22resample_fillmethod%22%3Anull%2C%22where%22%3A%22%22%2C%22having%22%3A%22%22%2C%22filters%22%3A%5B%5D%7D&standalone=true&height=400"
          }
        }
  },
      // Layout of the dashboard
      layout: {
        rows: []
      },
      editMode: true,
      isModalOpen: false
    };
 
    //bind functions
    this.addRow = this.addRow.bind(this);
    this.addWidget = this.addWidget.bind(this);
    this.saveTextWidget = this.saveTextWidget.bind(this);
    this.save = this.save.bind(this);
    
  }

  componentDidMount(){
  }

  /**
   * Load all Iframe types
   */
  widgetsTypes={};
  loadIframe = (iframes) => {
    iframes.map(iframe => {
      this.widgetsTypes[iframe.title] = {
        "type": IframeWidget,
        "title": iframe.title,
        "props":{
          "url": iframe.iframe_url
        }
      }
    }) 
  }

  /**
   * Method called for load stored user widget
   */
  load = (config) => {
    /*
    let response = widgetService.get();
    response.then((config) => {
      for(let i in config.widgets) {
        let widget = config.widgets[i];

        //assign instance to widget.type
        let typeWid = i.split('_')[0];
        if(this.widgetsTypes[typeWid]) {
          widget.type = this.widgetsTypes[typeWid].type;
          //last extends overrides previous
          widget.props = {...widget.props, ...this.widgetsTypes[typeWid].props,  wid_key: i};
        } else {
          console.error("Widget " + typeWid + " non trovato")
        }
      }

      //render widgets
      this.state.widgets = config.widgets;
      this.setLayout(config.layout);
    });
  */
  }

  /**
   * When a widget moved, this will be called. Layout should be given back.
   */
  onMove = (layout) => {
    this.setLayout(layout);
  }

  /**
  * Set layout Dashboard
  */
  setLayout = (layout) => {
    this.setState({
      layout: layout
    });

    this.save();
  }

  /**
  * Add row
  */
  addRow = function (widgetKey) { 
    let columns = [{
        className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
        widgets: [],
      }];

    let row = {columns: columns}

    this.state.layout.rows.push(row);
    this.setLayout(this.state.layout);
  }

  /**
  * Add widget
  */
  addWidget = function (widgetKey) {
    this.addRow();
    let newWidget = this.widgetsTypes[widgetKey];

    //count widget of type
    let progressive = this.getNextProgressive(widgetKey);
    //assign key to widget
    let newKey = widgetKey + "_" + progressive;
    if (!newWidget.props)
      newWidget.props = {};
    newWidget.props.wid_key = newKey;

    //add widget to list
    this.state.widgets[newKey] = newWidget;
    //add widget to layout
    this.state.layout.rows[this.state.layout.rows.length-1].columns[0].widgets.push({key: newKey});
    this.setLayout(this.state.layout);
  }

  /**
  * Count widget of type
  */
  getNextProgressive = function(type) {
    let counter = 0;
    Object.keys(this.state.widgets).map((name, wid) => {
      let nameArr = name.split('_');
      if (nameArr [0] == type) {
        let count = Number.parseInt(nameArr[1]);
        if (count > counter)
          counter = count;
      }
    })
    
    return counter + 1;
  }

  /**
  * Save Layout and widgets
  */
  save = () => {

    //clean layout from control button
    let layoutOld = JSON.parse(JSON.stringify(this.state.layout));
    let layout = {};

    for(let i in layoutOld) {
      let rows = layoutOld[i];
      if (rows) {
        rows.filter(row => {
          row.columns = row.columns.filter(col => {
            if (col.className == "col-w-30")
              return false;
            else
              return true;
          })
        })
        layout[i] = rows;
      }
    };

    //clean widgets from control button
    let widgetsOld = this.state.widgets;
    let widgets = {};

    for(let i in widgetsOld) {
      let widget = widgetsOld[i];
      /* if(!i.startsWith("BtnControlWidget")) { */
        if (i.indexOf('BtnControlWidget')==-1) {
        if (widget.type) {
          widgets[i] = JSON.parse(JSON.stringify(widget));
          widgets[i].type = widget.type.name
        }
      }
    }

    //save data
    const response = widgetService.save(layout, widgets);
  }

  /**
   * Save text of TextWidget
   */
  saveTextWidget = function (key, html) {
    this.state.widgets[key].props.text = html;
    this.save();
  }

  
  layout = {
      "rows":[
         {
            "columns":[
               {
                  "className":"col-lg-12 col-md-12 col-sm-12 col-xs-12",
                  "widgets":[
                     {
                        "key":"TitleWidget"
                     }
                  ]
               }
            ]
         },
         {
            "columns":[
               {
                  "className":"col-lg-12 col-md-12 col-sm-12 col-xs-12",
                  "widgets":[
                     {
                        "key":"SubtitleWidget"
                     }
                  ]
               }
            ]
         },
         {
            "columns":[
               {
                  "className":"col-lg-12 col-md-12 col-sm-12 col-xs-12",
                  "widgets":[
                     {
                        "key":"ProfileWidget"
                     }
                  ]
               }
            ]
         },
         {
            "columns":[
               {
                  "className":"col-lg-12 col-md-12 col-sm-12 col-xs-12 show-add-button",
                  "widgets":[
                     {
                        "key":"GraficoWidget"
                     }
                  ]
               }
            ]
         },
         {
            "columns":[
               {
                  "className":"col-lg-12 col-md-12 col-sm-12 col-xs-12",
                  "widgets":[
                     {
                        "key":"StoryTextWidget"
                     }
                  ]
               }
            ]
         },
         {
            "columns":[
               {
                  "className":"col-lg-12 col-md-12 col-sm-12 col-xs-12",
                  "widgets":[
                     {
                        "key":"ImageWidget"
                     }
                  ]
               }
            ]
         },
         {
            "columns":[
               {
                  "className":"col-lg-12 col-md-12 col-sm-12 col-xs-12",
                  "widgets":[
                     {
                        "key":"FooterWidget"
                     }
                  ]
               }
            ]
         }
      ]
   };


  /**
   * Render Function
   */
  render() {
    return (
    <Container>
      <Header />
      <Dashboard
        frameComponent={CustomFrame}
        onRemove={this.onRemove}
        layout={this.layout}
        widgets={this.state.widgets}
        editable={this.state.editMode}
        onAdd={this.onAdd}
        onMove={this.onMove}
        addWidgetText="Add New Widget"
        />
        <EditBar/>
    </Container>
    );
  }

}

export default Dash;
