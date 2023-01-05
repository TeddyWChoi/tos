var MAX_RANK = 5;
function addRank(rank, type) {
    var aJob = $("#jobWrap")
        .children()
        .sort(function (a, b) {
            return $(a).attr("data-id").toUpperCase().localeCompare($(b).attr("data-id").toUpperCase());
        });
    var classID, minRank, classType;
    for (var index = 0; index < aJob.length; index++) {
        var minRank = $(aJob[index]).attr("data-min-rank");
        var classID = $(aJob[index]).attr("data-id");
        var classType = classID.substr(0, 1);
        if (minRank > rank) continue;
        if (type != null && type != classType) continue;
        $("#rank" + rank + "_selector").append($(aJob[index]));
    }
}
function addSkill(rank, sID) {
    var aSkill = $("#skillWrap").children();
    var classID, minRank, classType;
    for (var index = 0; index < aSkill.length; index++) {
        var classID = $(aSkill[index]).attr("data-id");
        if (classID != sID) continue;
        $("#rank" + rank + "_skill").append($(aSkill[index]));
    }
    $("#rank" + rank + "_skill").css("display", "flex");
}
function onClickJob(e) {
    if ($(e.currentTarget).hasClass("active")) {
       
        $(e.currentTarget).removeClass("active");
        initRank(e);
    } else {
       
        var curRank = $(e.currentTarget).parent().attr("data-rank");
        var nextRank = (parseInt(curRank) + 1).toString();
        var classID = $(e.currentTarget).attr("data-id");
        var classType = classID.substr(0, 1);
        $("#rank" + curRank + "_skill").css("display", "flex");
        if (nextRank < MAX_RANK) {
            $("#rank_" + nextRank)
                .removeClass("rank_box_2")
                .addClass("rank_box_1");
        }
        $("#rank_" + curRank)
            .addClass("rank_box_3")
            .removeClass("rank_box_1");
        $(e.currentTarget).addClass("active");
        $("#jobWrap").append($(e.currentTarget).parent().children("a").not($(e.currentTarget)));
        addSkill(curRank, classID);
        addRank(parseInt(nextRank), classType);
    }
}
function clearRank(rank) {
    $("#rank_" + rank)
        .removeClass("rank_box_3")
        .removeClass("rank_box_1")
        .addClass("rank_box_2");
    $("#jobWrap").append($("#rank" + rank + "_selector").children("a"));
}
function clearSkill(rank) {
    console.log("!!!")
   // $("#rank" + rank + "_skill").css("");
    $("#skillWrap").append($("#rank" + rank + "_skill").children("p"));
}
function initRank(e) {
    var rank = $(e.currentTarget).parent().attr("data-rank");
    var classID = $(e.currentTarget).attr("data-id");
    var type = classID.substr(0, 1);
   
    for (var i = MAX_RANK - 1; i >= rank; i--) {
        clearRank(i);
        clearSkill(i);
    }
    
    $("#rank_" + rank)
        .removeClass("rank_box_2")
        .addClass("rank_box_1");
    addRank(rank, rank == 1 ? null : type);
}
$(document).ready(function () {
    addRank(1, null);
});
$(".rank .class_choice a").on("click", function () {
    $("#rank_2").removeClass("rank_box_2");
    $("#rank_2").addClass("rank_box_1");
    $("#rank_1").addClass("rank_box_3");
    $("#rank_1").removeClass("rank_box_1");
    $("#rank1_skill").css("display", "flex");
});
