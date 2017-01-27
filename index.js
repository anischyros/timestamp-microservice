var http = require("http");

var server = http.createServer(function(request, response)
{
	var param = decodeURIComponent(request.url).substring(1).trim();
	if (!param.length)
	{
		response.setHeader("Content-Type", "text/html");
		var out = emitInstructions();
	}
	else
	{
		response.setHeader("Content-Type", "text/json");
		var date = Date.parse(param);
		if (!isNaN(date))
		{
			var date = new Date(param);
		}
		else
		{
			var unixTime = parseInt(param);
			if (!isNaN(unixTime))
			{
				var date = new Date();
				date.setTime(parseInt(param) * 1000);
			}
			else
			{
				var date = null;
			}
		}

		if (date)
		{
			var obj =
			{
				natural: date.toDateString(),
				unix: date.getTime() / 1000,
				standard: date.toJSON()
			};
			var out = JSON.stringify(obj);
		}
		else
		{
			out = "null";
		}
	}

	response.setHeader("Content-Length", out.length);
	response.end(out);
});
server.listen(8080);
console.log("Listening to port 8080");

function emitInstructions(response)
{
	var out = "<html>";
	out += "<head><title>Timestamp Microservice</title></head>";
	out += "<body>";
	out += "<h1>Timestamp microservices</h1>";
	out += "Append to the URL a human-readable or a UNIX date.  The service ";
	out += "will return <strong>&quot;null&quot;</strong> if invalid or a ";
	out += "JSON object containing the human-readable (natural), a UNIX ";
	out += "timestamp, and a standard formatted timestamp."
	out += "</body></html>";

	return out;
}
