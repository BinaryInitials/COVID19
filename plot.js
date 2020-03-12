function plot(data, country){


    document.getElementById("loader").style.visibility = "visible";

    var xField = 'x';
    var yField = 'y';

    Plotly.d3.csv(data, function(err, data) {
        if(err) throw err;

        var graph_data = prepData(data);

        document.getElementById("loader").style.visibility = "hidden";
        document.getElementById("predictions").style.visibility = "visible";
        document.getElementById("metrics").style.visibility = "visible";
        document.getElementById("coffee").style.visibility = "visible";
        Plotly.newPlot('graph', graph_data[0], {title: 'COVID-19 Cases in ' + country, showlegend: true, plot_bgcolor: 'rgba(0, 0, 0, 0)', paper_bgcolor: 'rgba(0, 0, 0, 0)'});
        Plotly.newPlot('error', graph_data[1], {title: 'Error^2', showlegend: true, plot_bgcolor: 'rgba(0, 0, 0, 0)', paper_bgcolor: 'rgba(0, 0, 0, 0)'});
    });

    function prepData(data) {
        var x = [];
        var y = [];
        var X = [];
        var logy = [];
        var counter=0;
        var dates = [];
        var dates2 = [];
        data.forEach(function(d, i) {


            x.push(counter);
            X.push([counter, 1]);
            counter+=1;
            dates.push(new Date(d[xField]));
            dates2.push(new Date(d[xField]));
            y.push(d[yField]);
            logy.push(Math.log(d[yField]));

            console.log(dates[counter-1] + "\t" + d[yField])
        });

        const matrixX = math.matrix(X);
        const matrixY = math.matrix(logy);

        const vectorA = math.multiply(math.multiply(math.inv(math.multiply(math.transpose(matrixX), matrixX)), math.transpose(matrixX)), matrixY);


        var lambdaMin = vectorA.get([0])*0.5;
        var lambdaMax = vectorA.get([0])*2.0;
        var offsetMin = vectorA.get([1])-1;
        var offsetMax = vectorA.get([1])+1;
        var lambdaDelta = 0.001;
        var offsetDelta = 0.01;
        var minError = calculateError(x,y, vectorA.get([0]), vectorA.get([1]));
        var lambdaOpt = vectorA.get([0]);
        var offsetOpt = vectorA.get([1]);

        for(var lambda=lambdaMin;lambda<=lambdaMax;lambda+=lambdaDelta){
            for(var offset=offsetMin;offset<=offsetMax;offset+=offsetDelta){
                var error = calculateError(x, y, lambda, offset)
                if(error < minError){
                    minError = error;
                    lambdaOpt = lambda;
                    offsetOpt = offset;
                }
            }
        }

        var future = 14;

        var x2 = [];
        for(var i=0;i<x.length+future;i++){
            x2.push(i);
        }


        for(var i=1;i<=future;i++){
            dates2.push(dates[dates.length-1].addDays(i));
        }

        var yHat = [];
        for(var i=0;i<x2.length;i++){
            yHat.push(Math.exp(offsetOpt + lambdaOpt*x2[i]));
        }

        var bundle = calculateLogistic(x,y,future);
        var yHat2 = bundle[0];
        var y_error2 = bundle[1];

        var y_error1 = [];
        for(var i=0;i<x.length;i++){
            y_error1.push((y[i] - Math.exp(offsetOpt + lambdaOpt*x[i]))*(y[i] - Math.exp(offsetOpt + lambdaOpt*x[i])));
        }

        document.getElementById("model1_metric1").innerHTML = Math.round(10/lambdaOpt)/10 + " days";

        for(var i=x.length;i<x.length+10;i++){
            document.getElementById("row" + (i-x.length+1) + "_col2").innerHTML = Math.round(yHat[i]);
            document.getElementById("row" + (i-x.length+1) + "_col3").innerHTML = Math.round(yHat2[i]);
        }

        var x_inflection = [];
        var y_inflection = [];

        var metrics = bundle[2];

        x_inflection.push(dates[dates.length-1].addDays(metrics[1]-dates.length+1));
        y_inflection.push(metrics[0]/2.0);

        return [
            [
                {name: 'data', hoverinfo: 'y', mode: 'markers', x: dates, y: y, marker: {color: 'rgba(0,0,0,0.7)', size: 13}},
                {name: 'exp model', hoverinfo: 'y', mode: 'lines', x: dates2, y: yHat, line: {dash: 'dashdot', color: 'rgb(255,0,0)', size: 1}},
                {name: 'sigmoid model', hoverinfo: 'y', mode: 'lines', x: dates2, y: yHat2, line: {dash: 'dashdot', color: 'rgb(255,128,0)', size: 1}},
                {name: 'inflection point', hoverinfo: 'y', mode: 'markers', x: x_inflection, y: y_inflection, marker: {color: 'rgba(0,200,100,0.7)', size: 15}},
            ],
            [
                {name: 'exp error', hoverinfo: 'y', mode: 'lines', x: dates, y: y_error1, line: {dash: 'dashdot', color: 'rgb(255,0,0)', size: 1}},
                {name: 'sigmoid error', hoverinfo: 'y', mode: 'lines', x: dates, y: y_error2, line: {dash: 'dashdot', color: 'rgb(255,128,0)', size: 1}},
            ]
            ];
    }

    function calculateLogistic(x,y,future){
        // var L_min = 5000;
        // var L_max = 10000;
        // var L_delta = 1;
        // var L_opt = -1;

        var x0_min = 20;
        var x0_max = 40;
        var x0_delta = 1;
        var x0_opt = -1;

        var tau_min = 1;
        var tau_max = 6.0;
        var tau_delta = 1;
        var tau_opt = -1;

        var minError = 100000000;

        var y_ratio = [];
        for(var i=1;i<y.length;i++){
            y_ratio.push(y[i]/y[i-1]);
        }

        for(var x0=x0_min;x0<=x0_max;x0+=x0_delta){
            for(var tau=tau_min;tau<=tau_max;tau+=tau_delta){
                var error = calculateError3(x,y,x0,tau);
                if(error<minError){
                    minError = error;
                    x0_opt = x0;
                    tau_opt = tau;
                }
            }
        }

        var estL = 0;
        for(var i=0;i<x.length;i++){
            estL += y[i]*(1+Math.exp(-(x[i]-x0_opt)/tau_opt));
        }
        estL /= x.length;

        var L_max = estL*2;
        var L_min = estL/2;
        var L_delta = (L_max-L_min)/100;
        var L_opt = -1

        x0_min = x0_opt/2;
        x0_max = x0_opt*2;
        x0_delta = (x0_max-x0_min)/100;

        tau_min = tau_opt/2;
        tau_max = tau_opt*2;
        tau_delta = (tau_max-tau_min)/100;

        minError = 1000000;

        for(var L=L_min;L<=L_max;L+=L_delta){
            for(var x0=x0_min;x0<=x0_max;x0+=x0_delta){
                for(var tau=tau_min;tau<=tau_max;tau+=tau_delta){

                    var error = calculateError2(x,y,L,x0,tau);
                    if(error < minError){
                        minError = error;
                        L_opt = L;
                        x0_opt = x0;
                        tau_opt = tau;
                    }
                }
            }
        }

        var inflectionPointFromToday = x0_opt - x[x.length-1];
        var date = new Date();

        document.getElementById("model2_metric1").innerHTML = Math.round(L_opt) + " cases";
        document.getElementById("model2_metric2").innerHTML = Math.round(100*tau_opt)/100 + " days";
        document.getElementById("model2_metric3").innerHTML = Math.round(100*inflectionPointFromToday)/100 + " days from today";
        document.getElementById("model2_metric4").innerHTML = date.addDays(inflectionPointFromToday).toDateString();

        var yHat = [];
        var x2 = [];
        for(var i=0;i<x.length+future;i++){
            x2.push(i);
        }
        for(var i=0;i<x2.length;i++){
            yHat.push(L_opt / ( 1 + Math.exp(-(x2[i]-x0_opt)/tau_opt)));
        }

        var y_error2 = [];
        for(var i=0;i<x.length;i++){
            y_error2.push((y[i] - L_opt/(1 + Math.exp(-(x[i]-x0_opt)/tau_opt))) * (y[i] - L_opt/(1 + Math.exp(-(x[i]-x0_opt)/tau_opt))));
        }

        var metrics = [];
        metrics.push(L_opt);
        metrics.push(x0_opt);
        metrics.push(tau_opt);


        return [yHat, y_error2, metrics];
    }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    function calculateError(x, y, lambda, offset){
        var error = 0;
        for(var i=0;i<x.length;i++){
            error += (y[i] - Math.exp(offset + lambda*x[i]))*(y[i] - Math.exp(offset + lambda*x[i]));
        }
        return Math.sqrt(error/x.length);
    }

    function calculateError2(x, y, L, x0, tau){
        var error = 0;
        for(var i=0;i<x.length;i++){
            error += (y[i] - L/(1 + Math.exp(-(x[i]-x0)/tau))) * (y[i] - L/(1 + Math.exp(-(x[i]-x0)/tau)));
        }
        return Math.sqrt(error/x.length);
    }

    function calculateError3(x, y, x0, tau){
        var error = 0;
        for(var i=1;i<x.length;i++){
            error += (y[i]/y[i-1] - (1 + Math.exp(-(x[i-1]-x0)/tau))/(1 + Math.exp(-(x[i]-x0)/tau)))*(y[i]/y[i-1] - (1 + Math.exp(-(x[i-1]-x0)/tau))/(1 + Math.exp(-(x[i]-x0)/tau)));
        }
        return Math.sqrt(error/x.length);
    }
}