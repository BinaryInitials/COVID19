# COVID19

COVID19 is a web application that dynamically generates population models for the COVID-19 virus.

## Installation

Clone the project into your server or local host destination and open index.html. That's it.

```bash
git clone [git-address]
cd COVID19
open index.html
```

## Usage

The web app contains an html, a javascript, a bash, and a json file. The the bash script curls and scrapes data from the source into a json file. The javascript file parses the file and plots them via PlotLy. The 2 models are calculated on the client side. The html file renders the output. Remember to set a cron job for the bash script to regularly pull fresh data.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
