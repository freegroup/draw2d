var jsonDocument = 
    [
     {
       "type": "TableShape",
       "id": "63c0f27a-716e-804c-6873-cd99b945b63f",
       "x": 80,
       "y": 59,
       "width": 99,
       "height": 107,
       "userData": {},
       "cssClass": "TableShape",
       "bgColor": "#DBDDDE",
       "color": "#D7D7D7",
       "stroke": 1,
       "alpha": 1,
       "radius": 3,
       "name": "Group",
       "entities": [
         {
           "text": "id",
           "id": "49be7d78-4dcf-38ab-3733-b4108701f1"
         },
         {
           "text": "employee_fk",
           "id": "49be7d78-4dcf-38ab-3733-b4108701fce4"
         }
       ]
     },
     {
       "type": "TableShape",
       "id": "3253ff2a-a920-09d5-f033-ca759a778e19",
       "x": 255,
       "y": 246,
       "width": 99,
       "height": 155,
       "userData": {},
       "cssClass": "TableShape",
       "bgColor": "#DBDDDE",
       "color": "#D7D7D7",
       "stroke": 1,
       "alpha": 1,
       "radius": 3,
       "name": "Employee",
       "entities": [
         {
           "text": "id",
           "id": "e97f6f8a-4306-0667-3a95-0a5310a2c15c"
         },
         {
           "text": "firstName",
           "id": "357e132c-aa47-978f-a1fa-d13da6736989"
         },
         {
           "text": "lastName",
           "id": "a2156a71-f868-1f8f-e9a1-b185dbdfc3de"
         },
         {
           "text": "company_fk",
           "id": "8d410fef-5c6e-286d-c9c3-c152d5bd9c52"
         }
       ]
     },
     {
       "type": "TableShape",
       "id": "2810494b-931f-da59-fd9d-6deba4385fe0",
       "x": 460,
       "y": 79,
       "width": 99,
       "height": 83,
       "userData": {},
       "cssClass": "TableShape",
       "bgColor": "#DBDDDE",
       "color": "#D7D7D7",
       "stroke": 1,
       "alpha": 1,
       "radius": 3,
       "name": "Company",
       "entities": [
         {
           "text": "id",
           "id": "e04ebb27-43c9-1afa-a7d0-e55bf2aa62d5"
         }
       ]
     },
     {
       "type": "draw2d.Connection",
       "id": "19acf411-a02f-557a-7451-f3a741676c7b",
       "userData": {},
       "cssClass": "draw2d_Connection",
       "stroke": 2,
       "color": "#4caf50",
       "outlineStroke": 1,
       "outlineColor": "#ffffff",
       "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
       "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
       "radius": 2,
       "source": {
         "node": "3253ff2a-a920-09d5-f033-ca759a778e19",
         "port": "output_8d410fef-5c6e-286d-c9c3-c152d5bd9c52"
       },
       "target": {
         "node": "2810494b-931f-da59-fd9d-6deba4385fe0",
         "port": "input_e04ebb27-43c9-1afa-a7d0-e55bf2aa62d5"
       }
     },
     {
       "type": "draw2d.Connection",
       "id": "81cb3b59-66d1-ffc4-3cb7-0bad52ace43b",
       "userData": {},
       "cssClass": "draw2d_Connection",
       "stroke": 2,
       "color": "#4caf50",
       "outlineStroke": 1,
       "outlineColor": "#ffffff",
       "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
       "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
       "radius": 2,
       "source": {
         "node": "63c0f27a-716e-804c-6873-cd99b945b63f",
         "port": "output_49be7d78-4dcf-38ab-3733-b4108701fce4"
       },
       "target": {
         "node": "3253ff2a-a920-09d5-f033-ca759a778e19",
         "port": "input_e97f6f8a-4306-0667-3a95-0a5310a2c15c"
       }
     }
   ];