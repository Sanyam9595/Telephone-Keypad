//Style for display box
var display_box = {
    "width": "274px",
    "margin": "5px 20px",
    "border": "1px solid black",
    "height": "33px",
    "color": "black"
};

//style for keypad(div tag that storing keys)
var keypad = {
    "width": "300px",
    "margin": "0px 15px",
}

//style for keys
var key = {
    "width": "90px",
    "height": "60px",
    "float": "left",
    "margin-left": "5px",
    "margin-top": "5px"
}

//characters on each number
var characters = {
    "1": ". , !",
    "2": "a b c",
    "3": "d e f",
    "4": "g h i",
    "5": "j k l",
    "6": "m n o",
    "7": "p q r s",
    "8": "t u v",
    "9": "w x y z",
    "*": "",
    "0": "",
    "#": ""
}

//function for displaying keys
function keys(count) {
    if(count == 10) {
        count = '*'     //in 10th key displaying *
    }
    if(count == 11) {
        count = '0'     //in 11th key displaying 0
    }
    if(count == 12) {
        count = '#'     //in 12th key displaying #
    }
    html = "<button type='button' class='key' id='key"+count+"'>"+ count + " <br>"+ characters[count] +" </button>";
    return (html);
}

//creating a display box inside div having 'id=root' 
$("#root").append(
    "<div id='display'><input type='text' id='display_box' disabled/></div>"
)
$("#display_box").css(display_box)      //Giving style to display box

//creating a keypad below display box
$("#root").append(
    "<div id='telephone-keypad'></div>"
)

//calling keys function (12 times) to create 12 key inside keypad
for(i = 1; i < 13; i++) {
    $("#telephone-keypad").css(keypad)
    $("#telephone-keypad").append(keys(i))
    $(".key").css(key)   
}

var output = "",  temp = "",       //variable for displaying text inside display box ( permanently or temporarily)
    i = 2,      //Initialising i as 2 to display first character inside the key when key is clicked for first time
    time,       //variable to keep track of time for displaying characters in the key
    flag = 1,   //Initialising flag to differentiate between longpress and click
    id = "";    //Variable to keep track of previous key

//Function to display characters or number according to condition
$("document").ready(function(){
	$(".key").mousedown(function() {
        text = $(this).text()

        var newId = $(this).attr("id")
        if(id != newId ){      //Setting all values as default after new key is pressed if two different keys are clcked in 250ms
            id = newId;
            console.log("ugvbhb")
            clearTimeout(time);
            i = 2;
            output = temp;
            $("#display_box").val(output)
        }

	    timeout= setTimeout(function() {
	       output += text[0]
           $("#display_box").val(output)
           flag = 0
	     }, 1000);  //checking longpress if it it >= 1sec displaying number
	});

	$(".key").mouseup(function() {
        clearTimeout(timeout); // clearing timeout for next click

        temp = output; //emporary variable for displaying changing last character on clicks
        if(flag){       //If longpress is less than 1sec the displaying characters
            text = $(this).text()
            var len = text.length - 1;
            if (text[i] != " ") {
                temp += text[i];
            }
            $("#display_box").val(temp)
            i += 2; 
            if(i > len) {
                i = 2
            }
            clearTimeout(time); // clearing time to give 250ms for next changing character inside the key
        } 
        time = setTimeout(function() {
            i = 2;
            output = temp;
          }, 250); // waiting 250ms to let user to clicked next character on same key
          flag = 1; 
	});
})