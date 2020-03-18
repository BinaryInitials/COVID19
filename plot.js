function plot(data, country){

    

    var xField = 'x';
    var yField = 'y';

    Plotly.d3.csv(data, function(err, data) {

        if(err) throw err;

        var graph_data = prepData(data);

        
        document.getElementById("predictions").style.visibility = "visible";
        document.getElementById("metrics").style.visibility = "visible";
        document.getElementById("graph").style.visiblity= "visible";
        document.getElementById("error").style.visiblity= "visible";
        Plotly.newPlot('graph', graph_data[1], {title: 'COVID-19 Cases in ' + country, showlegend: true, plot_bgcolor: 'rgba(0, 0, 0, 0)', paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: {range: [0, graph_data[0][0]]}});
        Plotly.newPlot('error', graph_data[2], {title: 'log(Error)', showlegend: true, plot_bgcolor: 'rgba(0, 0, 0, 0)', paper_bgcolor: 'rgba(0, 0, 0, 0)'});
        Plotly.newPlot('inflection', graph_data[3], {title: 'Estimated Assymptotic Cases', xaxis:{title:{text:"Date of model creation"}}, yaxis:{title:{text:"Estimated cases"}}, showlegend: false, plot_bgcolor: 'rgba(0, 0, 0, 0)', paper_bgcolor: 'rgba(0,0,0,0)'})
        document.getElementById("loader").style.visibility = "hidden";
    });

    function prepData(data) {

        var x = [];
        var y = [];
        var dates = [];
        var dates2 = [];

        data.forEach(function(d, i) {
            y.push(d[yField]); 
            var datestring = d[xField] + "T00:00:00Z"
            dates.push(new Date(datestring));
            dates2.push(new Date(datestring));
        });

        for(var i=0;i<dates.length;i++){
            x.push((dates[i].getTime() - dates[0].getTime())/(24.0*60.0*60000.0));
        }

        var future = 14;
        var delta = 2;

        var bundleExponentialminus0 = calculateExponential(x,y,future);
        var bundleExponentialminus1 = calculateExponential(x.slice(0,y.length-delta),y.slice(0,y.length-delta),future);
        var bundleExponentialminus2 = calculateExponential(x.slice(0,y.length-2*delta),y.slice(0,y.length-2*delta),future);
        // var bundleExponentialminus3 = calculateExponential(x.slice(0,y.length-3),y.slice(0,y.length-3),future);
        // var bundleExponentialminus4 = calculateExponential(x.slice(0,y.length-4),y.slice(0,y.length-4),future);
        // var bundleExponentialminus5 = calculateExponential(x.slice(0,y.length-5),y.slice(0,y.length-5),future);
        
        var bundleLogisticminus0 = calculateLogistic(x,y,future);
        var bundleLogisticminus1 = calculateLogistic(x.slice(0,y.length-1*delta),y.slice(0,y.length-1*delta),future);
        var bundleLogisticminus2 = calculateLogistic(x.slice(0,y.length-2*delta),y.slice(0,y.length-2*delta),future);
        var bundleLogisticminus3 = calculateLogistic(x.slice(0,y.length-3*delta),y.slice(0,y.length-3*delta),future);
        var bundleLogisticminus4 = calculateLogistic(x.slice(0,y.length-4*delta),y.slice(0,y.length-4*delta),future);
        var bundleLogisticminus5 = calculateLogistic(x.slice(0,y.length-5*delta),y.slice(0,y.length-5*delta),future);

        var y_error1 = bundleExponentialminus0[1];
        var y_error2 = bundleLogisticminus0[1];

        for(var i=1;i<=future;i++){
            dates2.push(dates[dates.length-1].addDays(i));
        }

        var L_opt = bundleLogisticminus0[2][0];
        var x0_opt = bundleLogisticminus0[2][1];
        var tau_opt = bundleLogisticminus0[2][2];

        document.getElementById("model2_metric1").innerHTML = Math.round(L_opt) + " cases";
        document.getElementById("model2_metric2").innerHTML = Math.round(100*tau_opt)/100 + " days";
        document.getElementById("model2_metric3").innerHTML = dates[0].addDays(1+Math.round(x0_opt)).toDateString();

        document.getElementById("model1_metric1").innerHTML = Math.round(10/bundleExponentialminus0[2][0])/10 + " days";

        for(var i=x.length;i<x.length+10;i++){
            document.getElementById("row" + (i-x.length+1) + "_col1").innerHTML = dates[dates.length-1].addDays(i-x.length+2).toDateString();
            document.getElementById("row" + (i-x.length+1) + "_col2").innerHTML = Math.round(bundleExponentialminus0[0][i]);
            document.getElementById("row" + (i-x.length+1) + "_col3").innerHTML = Math.round(bundleLogisticminus0[0][i]);
        }

        var x_inflectionMinus0 = [];
        var x_inflectionMinus1 = [];
        var x_inflectionMinus2 = [];
        var y_inflectionMinus0 = [];
        var y_inflectionMinus1 = [];
        var y_inflectionMinus2 = [];
        var x_inflections = [];
        var y_inflections = [];

        
        x_inflectionMinus2.push(dates[0].addDays(Math.round(bundleLogisticminus2[2][1])).toISOString());
        x_inflectionMinus1.push(dates[0].addDays(Math.round(bundleLogisticminus1[2][1])).toISOString());
        x_inflectionMinus0.push(dates[0].addDays(Math.round(bundleLogisticminus0[2][1])).toISOString());
        
        x_inflections.push(dates[0].addDays(Math.round(bundleLogisticminus5[2][1])));
        x_inflections.push(dates[0].addDays(Math.round(bundleLogisticminus4[2][1])));
        x_inflections.push(dates[0].addDays(Math.round(bundleLogisticminus3[2][1])));
        x_inflections.push(dates[0].addDays(Math.round(bundleLogisticminus2[2][1])));
        x_inflections.push(dates[0].addDays(Math.round(bundleLogisticminus1[2][1])));
        x_inflections.push(dates[0].addDays(Math.round(bundleLogisticminus0[2][1])));
                
        y_inflections.push(f((x_inflections[0] - dates[0])/(24*60.0*60.0*1000.0), bundleLogisticminus5[2][0], bundleLogisticminus5[2][2], bundleLogisticminus5[2][1]));
        y_inflections.push(f((x_inflections[1] - dates[0])/(24*60.0*60.0*1000.0), bundleLogisticminus4[2][0], bundleLogisticminus4[2][2], bundleLogisticminus4[2][1]));
        y_inflections.push(f((x_inflections[2] - dates[0])/(24*60.0*60.0*1000.0), bundleLogisticminus3[2][0], bundleLogisticminus3[2][2], bundleLogisticminus3[2][1]));
        
        
        y_inflections.push(f(Math.round((x_inflections[3] - dates[0])/(24*60.0*60.0*1000.0)), bundleLogisticminus2[2][0], bundleLogisticminus2[2][2], bundleLogisticminus2[2][1]));
        y_inflections.push(f(Math.round((x_inflections[4] - dates[0])/(24*60.0*60.0*1000.0)), bundleLogisticminus1[2][0], bundleLogisticminus1[2][2], bundleLogisticminus1[2][1]));
        y_inflections.push(f(Math.round((x_inflections[5] - dates[0])/(24*60.0*60.0*1000.0)), bundleLogisticminus0[2][0], bundleLogisticminus0[2][2], bundleLogisticminus0[2][1]));

        y_inflectionMinus2.push(y_inflections[y_inflections.length-3]);
        y_inflectionMinus1.push(y_inflections[y_inflections.length-2]);
        y_inflectionMinus0.push(y_inflections[y_inflections.length-1]);


        var steadystates = [];
        steadystates.push(bundleLogisticminus5[2][0]);
        steadystates.push(bundleLogisticminus4[2][0]);
        steadystates.push(bundleLogisticminus3[2][0]);
        steadystates.push(bundleLogisticminus2[2][0]);
        steadystates.push(bundleLogisticminus1[2][0]);
        steadystates.push(bundleLogisticminus0[2][0]);

        x_inflections_dates = [];
        for(var i=0;i<6;i++){
            x_inflections_dates.push(dates[dates.length-1-5*delta+i*delta].toISOString());
        }

        var dates_text = []
        for(var i=0;i<dates.length;i++){
            dates_text.push(dates[i].toISOString());
        }

        var dates_text2 = []
        for(var i=0;i<dates2.length;i++){
            dates_text2.push(dates2[i].toISOString());
        }

        return [
                [Math.max(y_inflectionMinus0[0], y[y.length-1])*1.66],
                [
                    {name: 'data', hoverinfo: 'y', mode: 'markers', x: dates_text, y: y, marker: {color: 'rgba(0,0,0,0.7)', size: 13}},
                    {name: 'exp '+dates[dates.length-0*delta-1].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'lines', x: dates_text2, y: bundleExponentialminus0[0], line: {dash: 'solid', color: 'rgb(255,0,0)', size: 1}},
                    {name: 'exp '+dates[dates.length-1*delta-1].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'lines', x: dates_text2.slice(0,dates2.length-1-1*delta), y: bundleExponentialminus1[0], line: {dash: 'dashdot', color: 'rgb(200,0,50)', size: 1}},
                    {name: 'exp '+dates[dates.length-2*delta-1].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'lines', x: dates_text2.slice(0,dates2.length-1-2*delta), y: bundleExponentialminus2[0], line: {dash: 'dash', color: 'rgb(150,0,100)', size: 1}},
                    // {name: 'exp n-3', hoverinfo: 'y', mode: 'lines', x: dates2.slice(0,dates2.length-3), y: bundleExponentialminus3[0], line: {dash: 'dashdot', color: 'rgb(200,50,0)', size: 1}},
                    // {name: 'exp n-4', hoverinfo: 'y', mode: 'lines', x: dates2.slice(0,dates2.length-4), y: bundleExponentialminus4[0], line: {dash: 'dashdot', color: 'rgb(175,75,0)', size: 1}},
                    // {name: 'exp n-5', hoverinfo: 'y', mode: 'lines', x: dates2.slice(0,dates2.length-5), y: bundleExponentialminus5[0], line: {dash: 'dashdot', color: 'rgb(150,100,0)', size: 1}},

                    {name: 'sig '+dates[dates.length-0*delta-1].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'lines', x: dates_text2, y: bundleLogisticminus0[0], line: {dash: 'solid', color: 'rgb(0,0,255)', size: 1}},
                    {name: 'sig '+dates[dates.length-1*delta-1].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'lines', x: dates_text2.slice(0,dates2.length-1-1*delta), y: bundleLogisticminus1[0], line: {dash: 'dashdot', color: 'rgb(50,0,200)', size: 1}},
                    {name: 'sig '+dates[dates.length-2*delta-1].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'lines', x: dates_text2.slice(0,dates2.length-1-2*delta), y: bundleLogisticminus2[0], line: {dash: 'dash', color: 'rgb(10,0,150)', size: 1}},
                    // {name: 'sig n-3', hoverinfo: 'y', mode: 'lines', x: dates2.slice(0,dates2.length-3), y: bundleLogisticminus3[0], line: {dash: 'dashdot', color: 'rgb(50,0,200)', size: 1}},
                    // {name: 'sig n-4', hoverinfo: 'y', mode: 'lines', x: dates2.slice(0,dates2.length-4), y: bundleLogisticminus4[0], line: {dash: 'dashdot', color: 'rgb(75,0,175)', size: 1}},
                    // {name: 'sig n-5', hoverinfo: 'y', mode: 'lines', x: dates2.slice(0,dates2.length-5), y: bundleLogisticminus5[0], line: {dash: 'dashdot', color: 'rgb(100,0,150)', size: 1}},

                    {name: 'inf '+dates[dates.length-1-0*delta].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'markers', x: x_inflectionMinus0, y: y_inflectionMinus0, marker: {color: 'rgba(0,200,100,0.7)', size: 15}},
                    {name: 'inf '+dates[dates.length-1-1*delta].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'markers', x: x_inflectionMinus1, y: y_inflectionMinus1, marker: {color: 'rgba(25,175,75,0.7)', size: 15}},
                    {name: 'inf '+dates[dates.length-1-2*delta].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'markers', x: x_inflectionMinus2, y: y_inflectionMinus2, marker: {color: 'rgba(50,150,50,0.7)', size: 15}},
                ],
                [
                    {name: 'exp '+dates[dates.length-1].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'lines', x: dates_text, y: y_error1, line: {dash: 'solid', color: 'rgb(255,0,0)', size: 1}},
                    {name: 'sig '+dates[dates.length-1].toISOString().split('T')[0].replace(/^[0-9]{4}./g, ""), hoverinfo: 'y', mode: 'lines', x: dates_text, y: y_error2, line: {dash: 'solid', color: 'rgb(0,0,255)', size: 1}},

                ],
                [
                    {hoverinfo: 'x,y', mode: 'lines+markers', x: x_inflections_dates, y: steadystates, line: {dash: 'dash', color: 'rgb(0,100,50)', size: 2}, marker: {color: 'rgba(0,150,25,0.7)', size: 15}},
                ],
            ];
    }

    function calculateExponential(x,y,future){
        
        var X = [];
        var logy = [];

        for(var i=0;i<x.length;i++){
            X.push([x[i], 1]);
            logy.push(Math.log(y[i]));
        }

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

        var x2 = [];
        for(var i=0;i<x.length;i++){
            x2.push(x[i]);
        }
        for(var i=1;i<=future;i++){
            x2.push(x[x.length-1]+i);
        }

        var yHat = [];
        for(var i=0;i<x2.length;i++){
            yHat.push(Math.exp(offsetOpt + lambdaOpt*x2[i]));
        }

        var metrics = [];
        metrics.push(lambdaOpt);
        metrics.push(offsetOpt);

        var y_error = [];
        for(var i=0;i<x.length;i++){
            y_error.push(Math.log((y[i] - Math.exp(offsetOpt + lambdaOpt*x[i]))*(y[i] - Math.exp(offsetOpt + lambdaOpt*x[i]))));
        }

        return [yHat, y_error, metrics];
    }

    function estimateLogistic(x,y){

        var max = -1;
        for(var i=1;i<x.length;i++){
            if(x[i] > x[i-1]){
                max = Math.max(max, (y[i]-y[i-1])/(x[i]-x[i-1]));
            }
        }
        var A_4tau = max;
        var A_min = y[y.length-1];
        var tau_min = A_min / A_4tau * 4;
        var firstNonZeroIndex = 0;
        for(var i=0;i<y.length;i++){
            if(y[i] > 0){
                firstNonZeroIndex = i;
                break;
            }
        }
        var tau_max = (x[x.length-1] - x[firstNonZeroIndex]) / (Math.log(y[y.length-1]) - Math.log(y[firstNonZeroIndex]));
        var A_max = A_4tau * 4 * tau_max;

        return [A_min, A_max, tau_min, tau_max, 1, 1000]
    }

    function f(x, A, tau, x0){
        return A / ( 1 + Math.exp( - ( x - x0)  / tau     ) );
    }

    function optimizeTrigger(x,y){
        var p = estimateLogistic(x,y)
        var A_min = p[0];
        var A_max = p[1];
        var tau_min = p[2];
        var tau_max = p[3];
        var x0_min = p[4];
        var x0_max = p[5];
        var error0 = 1e99;


        var m = optimizeLogistic(x,y,A_min,A_max,tau_min,tau_max,x0_min,x0_max,error0);
        for(var i=0;i<5;i++){
            var rate = Math.pow(0.1, Math.pow(2.0, -i) );
            m = optimizeLogistic(x,y,m[0]*rate,m[0]*(2-rate),m[1]*rate,m[1]*(2-rate),m[2]*rate,m[2]*(2-rate),m[3]);
        }
        return m;
    }

    function optimizeLogistic(x,y,A_min,A_max,tau_min,tau_max,x0_min,x0_max,error0){
        var ITERATIONS = 50;
        var A_delta = (A_max - A_min) / ITERATIONS;
        var tau_delta = (tau_max - tau_min) / ITERATIONS;
        var x0_delta = (x0_max - x0_min) / ITERATIONS;

        var A_opt = (A_max + A_min) / 2;
        var tau_opt = (tau_max + tau_min) / 2;
        var x0_opt = (x0_max + x0_min) / 2;

        var minerror = error0;

        for(var A = A_min; A <= A_max; A += A_delta){
            for(var tau = tau_min; tau <= tau_max; tau += tau_delta){
                for(var x0 = x0_min; x0 <= x0_max; x0 += x0_delta){
                    var error = 0;
                    for(var i=0;i<x.length;i++){
                        error += (f(x[i], A, tau, x0) - y[i])*(f(x[i], A, tau, x0) - y[i]);
                    }
                    if(error < minerror){
                        minerror = error;
                        A_opt = A;
                        tau_opt = tau;
                        x0_opt = x0;
                        // console.log(minerror + "\t" + A_opt + "\t" + tau_opt + "\t" + x0_opt);
                    }
                }
            }
        }

        return [A_opt, tau_opt, x0_opt, minerror];
    }

    function calculateLogistic(x,y,future){
        // var L_min = 5000;
        // var L_max = 10000;
        // var L_delta = 1;
        // var L_opt = -1;

        // var x0_min = 20;
        // var x0_max = 40;
        // var x0_delta = 1;
        // var x0_opt = -1;

        // var tau_min = 1;
        // var tau_max = 6.0;
        // var tau_delta = 1;
        // var tau_opt = -1;

        // var minError = 100000000;

        // var y_ratio = [];
        // for(var i=1;i<y.length;i++){
        //     y_ratio.push(y[i]/y[i-1]);
        // }

        // for(var x0=x0_min;x0<=x0_max;x0+=x0_delta){
        //     for(var tau=tau_min;tau<=tau_max;tau+=tau_delta){
        //         var error = calculateError3(x,y,x0,tau);
        //         if(error<minError){
        //             minError = error;
        //             x0_opt = x0;
        //             tau_opt = tau;
        //         }
        //     }
        // }

        // var estL = 0;
        // for(var i=0;i<x.length;i++){
        //     estL += y[i]*(1+Math.exp(-(x[i]-x0_opt)/tau_opt));
        // }
        // estL /= x.length;

        // var L_max = estL*2;
        // var L_min = estL/2;
        // var L_delta = (L_max-L_min)/100;
        // var L_opt = -1

        // x0_min = x0_opt/2;
        // x0_max = x0_opt*2;
        // x0_delta = (x0_max-x0_min)/100;

        // tau_min = tau_opt/2;
        // tau_max = tau_opt*2;
        // tau_delta = (tau_max-tau_min)/100;

        // minError = 1000000;

        // for(var L=L_min;L<=L_max;L+=L_delta){
        //     for(var x0=x0_min;x0<=x0_max;x0+=x0_delta){
        //         for(var tau=tau_min;tau<=tau_max;tau+=tau_delta){

        //             var error = calculateError2(x,y,L,x0,tau);
        //             if(error < minError){
        //                 minError = error;
        //                 L_opt = L;
        //                 x0_opt = x0;
        //                 tau_opt = tau;
        //             }
        //         }
        //     }
        // }
        var m = optimizeTrigger(x,y);

        var L_opt = m[0];
        var tau_opt = m[1];
        var x0_opt = m[2];

        var yHat = [];
        var x2 = [];
        for(var i=0;i<x.length;i++){
            x2.push(x[i]);
        }
        for(var i=1;i<=future;i++){
            x2.push(x[x.length-1]+i);
        }
        for(var i=0;i<x2.length;i++){
            yHat.push(L_opt / ( 1 + Math.exp(-(x2[i]-x0_opt)/tau_opt)));
        }

        var y_error2 = [];
        for(var i=0;i<x.length;i++){
            y_error2.push(Math.log((y[i] - L_opt/(1 + Math.exp(-(x[i]-x0_opt)/tau_opt))) * (y[i] - L_opt/(1 + Math.exp(-(x[i]-x0_opt)/tau_opt)))));
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