# Connected Device Data Dashboard

The examples in [this directory](https://github.com/tigoe/html-for-conndev/blob/main/DeviceDataDashboard/) show how to connect a WiFi-connected microcontroller to a web page using a few command line tools. To make the most of this tutorial, you should understand:
* DOM structure as shown in [this template example](../template/)
* Arduino WiFiNINA (for Nano 33, Uno WiFi, MKR1010) or WiFi101 (for MKR1000) libraries. See the WiFi_Startup and WiFi_status videos in [this showcase](https://vimeo.com/showcase/6916443) for an intro to the WiFiNINA library.

You'll need:
* WiFi connected Arduino. Nano 33, Uno WiFi, MKR1010, or MKR1000 will work.
* A computer with a POSIX-compatible command line interface. MacOS, Linux, or Window 10 or later running  [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install) will work.

## TCP Socket Connections

The Arduino WiFi libraries are capable of making transport-layer connections to remote hosts via TCP and UDP. The [WiFiTCPClientLogger example](https://github.com/tigoe/html-for-conndev/blob/main/DeviceDataDashboard/WiFiTCPClientLogger/WiFiTCPClientLogger.ino) shows how to make a TCP connection to a remote host on port 8080, and to send data as a JSON string once every five seconds. 

### Connecting to Netcat 

To test this on your own computer, change the IP address in the  example to your computer's IP address and then upload it to your board. Then
open a command line interface (Terminal on MacOS, WSL on Windows) and run the netcat command like so:

````
$ nc -l 8080
````

_By convention, whenever you see `$` at the beginning of the line in these examples, it represents the command prompt. You don't need to type it._

This will start netcat listening for incoming TCP connections on port 8080. After a few seconds, you should see the readings from the Arduino sketch coming in. They'll look like this:

````
{"sensor": 397}
{"sensor": 400}
{"sensor": 396}
````
Type `control-C` to stop netcat. This takes over your command line, so you can run it in the background like so:

````
$ nc -l 8080 &
````

This will cause the shell to start your process, print out the process ID (PID) number,  and return to the command prompt. It will keep printing the output as well. If you want to kill the process now, type:

````
$ kill 32656
````

Replace 32656 with the process number of your process. 

You can get a list of all your currently running processes and their process numbers like this:

````
$ ps -a
````

### Logging To A File

It would be useful to save the incoming sensor readings to a file. 

You can redirect the output of any process using the redirect operators `>` and `>>`. If you want to overwrite the file, use `>`. If you want to append to the file, use `>>`. So to run netcat and redirect its output to a file, you can do this:

````
$ nc -l 8080 >> log.json &
````

If you open the file with a text editor, you'll see the latest readings. It will look like [this example](dashboard/log.json). 

You can also fork the output from the program to both a file and to the command line using the `tee` command. Here's how:

````
nc -l 8080 | tee log.json
````

Of course, you can run it in the background with `&` like so:

````
nc -l 8080 | tee log.json &
````

## Reading A File in JavaScript with Fetch

JavaScript's `fetch()` command allows you to make HTTP calls from within a page, to add content to the page. This script makes a fetch call every 5 seconds, retreiving  the `log.json` file and displaying it in a div of the HTML page in which the script is embedded. 

To see this whole system in action:

1. Start an Arduino running with the WiFiTCPClientLogger script. 
2. Download the index.html and script.js files into the same directory. 
3. On the command line change directories (`cd`) to the directory. 
4. Run netcat and python's http.server script like so (python 2, for older systems):

````
nc -l 8080 >> log.json & python -m SimpleHTTPServer
````

On MacOS Monterey or any other operating system running Python 3, you can use this instead:

````
nc -l 8080 >> log.json & python -m http.server
````

5. open the index page in a browser by going to `http://localhost:8000`.  

Now you've got a rudmimentary HTML dashboard for your data. Once you've fetched the data file, you can customize the display of it in HTML and JS as much as you wish. You can see the page in action at [this link](dashboard).  