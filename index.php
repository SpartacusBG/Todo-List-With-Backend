<!DOCTYPE html>
<html>
<head>
  <title>TODO List</title>
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
  <link rel="stylesheet" type="text/css" href="css/main.css">
  <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
  <script src="lib/jquery-ui.min.js"></script>
  <script src="script/main.js"></script>
</head>
<body>


  <div class="todo-list-container">
    <form id="test-form" class="todo-list-head">
        <input placeholder="Enter Text Here" id="description" name="description" type="text">
        <button id="submit-button">Save</button>
    </form>
    <div class="todo-list-body" id="sortable">


      
    </div>

    <div id="todo-list-footer" class="todo-list-footer">
      <span id="counter" class="counter"></span>
      <div id="footer-buttons" class="clearfix">
        <button id="marked-as-done" class="footer-button">Marked asDone</button>
        <button id="not-completed" class="footer-button">Not Done</button>
        <button id="all-tasks" class="footer-button">All Tasks</button>
        
      </div>

    </div>
    
  </div>





</body>
</html>