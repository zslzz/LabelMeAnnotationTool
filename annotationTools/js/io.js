/** @file Input/output functions for writing annotation files to the LabelMe server. */
//http://localhost:9997/tool.html?imgurls=[project_1_task_5_456789.jpg,project_1_task_4_6789123.jpg,project_1_task_3_7654321.jpg]&user_name=luffy
//http://labelme2.csail.mit.edu/Release3.0/tool.html?collection=LabelMe&mode=f&folder=//05june05_static_indoor&image=p1010843.jpg&username=
//http://localhost:9997/tool.html?imgurls=[project_1_task_5_456789.jpg,project_1_task_4_6789123.jpg,project_1_task_3_7654321.jpg]&user_name=luffy
//http://localhost:9999/tool.html?project_id=46&user_id=2&user_name=luffy
/***
 * 提交审核答案格式
 *https://server.startask.net/taskrun/get
 * {
    "project_id": 28,
    "user_id": 2
}
 * https://server.startask.net/taskrun/addauditrun
 * {
    "task_id": 2,
    "taskrun_id": 6,
    "project_id": 1,
    "user_id": 2,
    "info": {
        "answer": true,
        "unpassed": [
            "条件一",
            "条件二",
            "条件三",
            "条件四",
            "条件五",
            "条件六"
        ]
    }
}

 https://server.startask.net/task/tasks_todo
 {"project_id":28,"user_id":2}

 https://server.startask.net/taskrun/addtaskrun
 {
    "task_id": 2,
    "project_id": 1,
    "user_id": 2,
    "info": {"anno":"zxczxc"
    }
}

 */
function getTask() {
    var request_url = "https://server.startask.net/task/tasks_todo";
    var datajson = "{\"project_id\":" + project_id + ",\"user_id\":" + user_id + "}";
    $.ajax({
        type: "POST",
        url: request_url,
        async: false,//同步获取数据
        data: datajson,
        contentType: "application/json",
        dataType: "text",
        success: function (re) {
            var obj = JSON.parse(re);
            task_list = obj;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

function addtaskrun() {
    var request_url = "https://server.startask.net/taskrun/addtaskrun";
    oXmlSerializer = new XMLSerializer();
    sXmlString = oXmlSerializer.serializeToString(LM_xml);//格式化标注数据

    sXmlString = sXmlString.replace(/ xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\"/g, "");

    var datajson = "{\"project_id\":" + project_id + ",\"user_id\":" + user_id + "," +
        "\"task_id\":" + task_list[current_i]["id"] + ",\"info\":{\"anno\":\"" + sXmlString + "\"}}";
    console.log(datajson)
    $.ajax({
        type: "POST",
        url: request_url,
        data: datajson,
        contentType: "application/json",
        dataType: "text",
        success: function (re) {
            console.log(re)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

function createXml(str) {
    if (document.all) {
        var xmlDom = new ActiveXObject("")
        xmlDom.loadXML(str)
        return xmlDom
    }
    else
        return new DOMParser().parseFromString(str, "text/xml")
}

function ReadXML(xml_file, SuccessFunction, ErrorFunction) {
    /***
     *从task中获得，如果存在xml，则执行SuccessFunction 渲染annotations
     * @param str
     * @returns {*}
     */

        // var xml = "<annotation>\n" +
        //     "  <filename>img1.jpg</filename>\n" +
        //     "  <folder>example_folder</folder>\n" +
        //     "  <source>\n" +
        //     "    <sourceImage>The MIT-CSAIL database of objects and scenes</sourceImage>\n" +
        //     "    <sourceAnnotation>LabelMe Webtool</sourceAnnotation>\n" +
        //     "  </source>\n" +
        //     "  <private>\n" +
        //     "    <global_count>1</global_count>\n" +
        //     "    <pri_username>anonymous</pri_username>\n" +
        //     "    <edited>0</edited>\n" +
        //     "    <old_name>my1</old_name>\n" +
        //     "    <new_name>my1</new_name>\n" +
        //     "    <modified_cpts>cpts_not_modified</modified_cpts>\n" +
        //     "    <video>0</video>\n" +
        //     "  </private>\n" +
        //     "  <object>\n" +
        //     "    <name>my1</name>\n" +
        //     "    <deleted>0</deleted>\n" +
        //     "    <verified>0</verified>\n" +
        //     "    <occluded>no</occluded>\n" +
        //     "    <attributes/>\n" +
        //     "    <parts>\n" +
        //     "      <hasparts/>\n" +
        //     "      <ispartof/>\n" +
        //     "    </parts>\n" +
        //     "    <id>2</id>\n" +
        //     "    <polygon>\n" +
        //     "      <username>anonymous</username>\n" +
        //     "      <pt>\n" +
        //     "        <x>166</x>\n" +
        //     "        <y>98</y>\n" +
        //     "      </pt>\n" +
        //     "      <pt>\n" +
        //     "        <x>223</x>\n" +
        //     "        <y>189</y>\n" +
        //     "      </pt>\n" +
        //     "      <pt>\n" +
        //     "        <x>105</x>\n" +
        //     "        <y>255</y>\n" +
        //     "      </pt>\n" +
        //     "      <pt>\n" +
        //     "        <x>62</x>\n" +
        //     "        <y>165</y>\n" +
        //     "      </pt>\n" +
        //     "    </polygon>\n" +
        //     "  </object>\n" +
        //     "</annotation>"
    var xml = '<annotation></annotation>'
    SuccessFunction(createXml(xml))
    // $.ajax({
    //   type: "GET",
    //   url: xml_file,
    //   dataType: "xml",
    //   success: SuccessFunction,
    //   error: ErrorFunction
    // });
}

function WriteXML(url, xml_data, SuccessFunction, ErrorFunction) {
    oXmlSerializer = new XMLSerializer();
    sXmlString = oXmlSerializer.serializeToString(LM_xml);


    // use regular expressions to replace all occurrences of
    sXmlString = sXmlString.replace(/ xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\"/g, "");

    console.log(sXmlString)
    SuccessFunction(sXmlString)
    // $.ajax({
    // type: "POST",
    // url: url,
    // data: sXmlString,
    // contentType: "text/xml",
    // dataType: "text",
    // success: SuccessFunction,
    // error: function(xhr,ajaxOptions,thrownError) {
    //   console.log(xhr.status);
    //   console.log(thrownError);
    // }
    // });
}
