const fs = require("fs");
const orangutan = require("orangutan");
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("No arguments given, please specify desired files for parsing");
  process.exit();
}

for (var i = 0; i<args.length; i++) {
  var file = args[i];

  fs.readFile(file, "utf-8", (function(file) {
    return function(error, data) {
      if (error) {
        switch (error.errno) {
        case -2:
          console.log("The file [" + file + "] was not found");
          break;
        default:
          console.log("Unknown error encountered:");
          console.log(error);
        }
      } else {
        console.log(new Date());
        orangutan.parse(data, false, function(suggestions) {
          fs.writeFile(file + ".json",
                       JSON.stringify(suggestions, false, 2),
                       "utf-8",
                       function(error) {
                         if (error) {
                           console.log("Could not save file, error was:");
                           console.log(error);
                         }
                       });
          console.log(new Date());
        });
      }
    };
  })(file));
}
