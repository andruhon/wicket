Convert wicket-ajax-jquery into TypeScript experiment

## Building
```cd wicket-core/src/main/typescript```  
```npm install```  
```npm run tsc```  
```npm run rollup``` 

Please note it will replace original org/apache/wicket/ajax/res/js/wicket-ajax-jquery.js

## Building with MVN
Include `ts-transpile` profile by adding `-P ts-transpile` to build with frontend-maven-plugin. 

## Disclaimer
This is just an experiment and not yet intended for any development or production use whatsoever.