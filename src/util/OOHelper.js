/*
 * secure replacement for eval("new " + string + "()")
 */

global.getInstanceForName=function (name) {
	var cls = getNestedVarForName(name);
	if (cls) {
		return new cls();
	}
}

global.getNestedVarForName=function (name) {
	var parts = name.split("."), base = window;
	for (var i = 0, iMax = parts.length; i < iMax; i++) {
		base = base[parts[i]];
		if (base == undefined)
			break;
	}
	return base;
}