var parentWin = windowArguments.window;
var retarg = { result: "" };
var pindex = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
parent.layer.close(pindex);
