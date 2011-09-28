$(document).ready(function() {
    initOrderingColumns();
    $("a.delete").click(deleteItem);
    $("a.moveDown").click(moveDown);
    $("a.moveUp").click(moveUp);
    $("input#save_order").click(saveOrder);
});

function initOrderingColumns() {
    var mainContainer = "form_sections";

    $("#"+mainContainer+" tbody tr").each(function(index, element){
	$("a.moveDown", element).show();
	$("a.moveUp", element).show();
    });
    
    var fieldToStartFrom = 1;
    
    $("#"+mainContainer+" tbody tr:nth-child("+fieldToStartFrom+")").each(function(index, element){
	$("a.moveDown", element).show();
	$("a.moveUp", element).hide();
    });
    
    $("#"+mainContainer+" tbody tr:last").each(function(index, element){
	$("a.moveDown", element).hide();
	$("a.moveUp", element).show();
    });
    
    $("#"+mainContainer+" tbody tr").each(function(index, element){	$(element).find(".updatedFormSectionOrder :input").val(index + 1); });
}
function moveUp()
{
    var row = $(this).parents("tr");
    var prevRow = row.prev("tr");
    prevRow.before(row);
    initOrderingColumns();
    return false;
}
function changeDirection(fieldName, isUp){
    var curAction= $('#changeDirection').attr('action');
    if (isUp){
	curAction += 'move_up';
    }else{
	curAction += 'move_down';
    }
    $('#changeDirection').attr('action', curAction);
    $('#changeDirectionFieldName').val(fieldName);
    $('#changeDirectionSubmit').click();
}
function deleteItem(){
    var td = $(this).parents("td");
    var fieldName = td.find("input[name=field_name]").val();
    $('#deleteFieldName').val(fieldName);
    if (confirm("Warning: If you continue, any data associated with this field will be lost.\nIf you\'re uncertain, disable the field instead.\nClick Cancel to go back. Click OK to Delete the field.")){	
	$('#deleteSubmit').click();
    }
}
function moveDown()
{
    var row = $(this).parents("tr");
    var prevRow = row.next("tr");
    prevRow.after(row);
    initOrderingColumns();
    return false;
}

function saveOrder(event) {
    var form_order = {};
    var updatedOrderings = $('.updatedFormSectionOrder :input');
    $.each(updatedOrderings, function() { 
	var name = $(this).attr("name");
	var id = /form_order\[(.*)\]/.exec(name)[1]
	form_order[id] = $(this).attr("value");
    });
    var url='';
    var formId='';
    if ($('#editFormDetails').length === 0){
	url = '/form_section/save_order';
    }else{
	url = '/form_section/save_order_single';
	formId = $('#sectionId').html();
    }

    
    $.ajax({
	type: "POST",
	data: {"form_order" : form_order,
	       "formId" : formId},
	url: url,
	success: function(data) {
	    if ($('#form_sections').length === 1){
		$("#form_sections").html($(data).find("#form_sections"));
		$("a.moveDown").bind("click", moveDown);
		$("a.moveUp").bind("click", moveUp);
		initOrderingColumns();		
	    }
	}
    });
}