(function(){
    $(document).ready(function() {
       callJuerySortable();
       submitForm();
       getTodosFromServer();
       deleteTask();
       showDoneTasks();
       showAllTasks();
       showNotCompletedTasks();
       showConter();

    });


    function showConter() {
        var $counter = $('#counter');

        $.ajax({
                type: "POST",
                url: 'form.php',
                data: {
                    count: "count"
                },
                success: function(response) { 
                    $counter.html(response);      
                    
                },
                error: function(xhr, status, errorThrown) {
                    alert(errorThrown);
                }
               
        });

    }



    function showAllTasks() {
        var $allTasksButton = $('#all-tasks');
        $allTasksButton.on('click', function() {
            getTodosFromServer();
        });
    }


    function toggleActiveClass(selectedItem) {

        var $itemsArray = $('#footer-buttons').children();       
        $itemsArray.each(function() {
            var item = $(this);

            if(item.attr('id') == selectedItem) {
                item.addClass('active');

            }else {
                item.removeClass('active');
            }

        });


    }

    function showNotCompletedTasks() {
        var $notCompletedTasksButton = $('#not-completed');

        $notCompletedTasksButton.on('click', function() {

             $.ajax({
                type: "POST",
                url: 'form.php',
                data: {
                    filter: "notDone"
                },
                success: function(response) {
                    
                   
                    var responseArray = JSON.parse(response);
                    toggleActiveClass('not-completed');
                    createElements(responseArray);
                    
                    
                },
                error: function(xhr, status, errorThrown) {
                    alert(errorThrown);
                }
               
            });


        });

    }


    function showDoneTasks() {
        var $markAsDoneButton = $('#marked-as-done');

        $markAsDoneButton.on('click', function() {
             $.ajax({
                type: "POST",
                url: 'form.php',
                data: {
                    filter: "done"
                },
                success: function(response) {
                    var responseArray = JSON.parse(response);
                    toggleActiveClass('marked-as-done');
                    createElements(responseArray);
                },
                error: function() {
                    alert("You have no done tasks");
                }
               
            });

        });

    }


    function deleteTask() {
        var $deleteButton = $('.delete-button'); 
        var $checkBoxArray = $('.checkbox');
        $deleteButton.on('click', function() {
            var item = $(this);
            var deleteValue;
            var parent = item.parent();
            deleteValue = parseInt(parent.attr("id"));

            console.log(deleteValue);
    
            $.ajax({
                type: "POST",
                url: 'form.php',
                data: {
                    deleteValue: deleteValue
                },
                success: function() {
                      location.reload();
                }
               
            });


        });


    }

    function markAsDone() {
        $('.checkbox').on('change', function() {
            var item = $(this);
            var parent = item.parent();
            var isChecked = 0;
            var itemId = parent.attr("id");


            if(item.is(":checked")) {
                isChecked = 1;
            }

             $.ajax({
                type: "POST",
                url: 'form.php',
                data: (
                    {
                        checked: isChecked,
                        itemId: itemId
                    }),
                success: function() {
                    showConter();
                   // console.log("checked");
                }
            });

        });

    }


    function submitForm() {
        var $submitForm = $('#test-form');
        var $descriptionField = $('#description');
        var $submitButton = $('#submit-button');
        $submitButton.on('click', function() {

            var data = $descriptionField.val();

            $.ajax({
                type: "POST",
                url: 'form.php',
                data: (
                    {
                        description: data
                    }),
                success: function() {
                    console.log("You have created a new task");
                }
               
            });
        });
    }


    function getTodosFromServer() {

        $.ajax({
           type: "POST",
            url: 'form.php',
            data: {
                filter: "all"
            },
            
            success: function(response) {
               var responseArray = JSON.parse(response);
               toggleActiveClass('all-tasks');
               createElements(responseArray);

            }, error: function(error) {
                console.log("error");
            }
        });


    }




    function createElements(responseArray) {
        $('.todo-list-body').empty();
        responseArray.forEach(function(item) {

            var $newParagraph = $('<p></p>');
            var $newCheckbox = $('<input type="checkbox">');
            var $deleteButton = $('<button>Delete</button>');
            $newParagraph.addClass('table-row').addClass('ui-state-default').text(item.desc).appendTo($('.todo-list-body'));
            $newParagraph.prop("id", item.id);
            $newCheckbox.addClass('checkbox').appendTo($newParagraph);
            $deleteButton.addClass('delete-button').appendTo($newParagraph);
            if(item.check == 0) {
                $newCheckbox.prop("checked", false);
            }else {
                $newCheckbox.prop("checked", true);
            }    
        });
       
        markAsDone();
        deleteTask();
    }

    function callJuerySortable() {
        $( function() {
            $( "#sortable" ).sortable();
          //  $( "#sortable" ).disableSelection();

        });
    }
    




})();