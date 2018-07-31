/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import com.google.template.soy.SoyFileSet;
import com.google.template.soy.data.SoyMapData;
import com.google.template.soy.tofu.SoyTofu;

import java.io.File;

public class JavaScript
{
    public static void main(String[] args) {
	function toggleDarkLight() {
        var body = document.getElementById("body");
        var currentClass = body.className;
        body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
        }
    }
}