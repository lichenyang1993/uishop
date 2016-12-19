/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-19
 * Time: 下午12:27
 * To change this template use File | Settings | File Templates.
 */

function uploadWork(){
    console.log("上传新作品");
}

function addWorkPic(){
    var workPicDiv = document.getElementById("workPicDiv");


    // 添加div
//        <div class="workPicItem">
//            <input type="file" name="workBigPic1" class="form-control">
//            <button class="btn btn-danger btn-sm workPicDel">删除</button>
//        </div>
//    var workItem = document.createElement("div");
//    workItem.className = "workPicItem";
//
//    var input = document.createElement('input');
//    input.setAttribute('type','file');
//    input.setAttribute('name','workPic[]');
//    input.className = 'form-control pic-file';
//
//    var btn = document.createElement('button');
//    btn.className = "btn btn-danger btn-sm workPicDel";
//    btn.innerHTML = "删除";
//    btn.setAttribute("onclick","deletePic(this);");
//    workItem.appendChild(input);
//    workItem.appendChild(btn);
//    workPicDiv.appendChild(workItem);
//
//    // 动态添加验证
//    $input = $(input);
//    $('#newWorkForm').formValidation('addField', $input);
    var $template = $('#workPicDivTemplate'),
        $clone    = $template
            .clone()
            .removeClass('hide')
            .removeAttr('id')
            .insertBefore($template),
        $workPic   = $clone.find('[name="workPic[]"]');

    // Add new field
    $('#newWorkForm').formValidation('addField', $workPic);
}

function deletePic(btn){
//    console.log("删除作品图片",
//        btn);
//    var workPicDiv = btn.parentNode.parentNode;
//    workPicDiv.removeChild(btn.parentNode);
    var $row    = $(btn).parents('.form-group'),
    $workPic = $row.find('[name="workPic[]"]');

    // Remove element containing the option
    $row.remove();

    // Remove field
    $('#newWorkForm').formValidation('removeField', $workPic);
}

function saveNewWork(){
    var validation = $('#newWorkForm').data('formValidation');
    validation.validate();
    if(!validation.isValid()){
        console.log("表单验证未通过");
    }
    // 获得表单控件的值
    var workName = $('#workName').val();
    var workCover = $('#workCover').get(0).files[0];
    var workPrice = $('#workPrice').val();
//    var workDescription = $('#workDescription').text();
    var workDescription = document.getElementById('workDescription').value;
    var workFile = $('#workFile').get(0).files[0];
    var fd = new FormData();
    fd.append('workName',workName);
    fd.append('workCover',workCover);
    fd.append('workPrice',workPrice);
    fd.append('workDescription',workDescription);
    fd.append('workFile',workFile);
    var workPics = document.getElementsByClassName("pic-file");
    for(var i = 0; i < workPics.length; i++){
        fd.append('workPic[]',workPics[i].files[0]);
    }

    $('#upload-prompt').removeClass('hide');
    $.ajax({
        url: '/upload.php',
        type: 'POST',
        cache: false,
        data: fd,
        processData: false,
        contentType: false
    }).done(function(res) {
            alert('上传成功')
        }).fail(function(res) {
            alert('上传失败')
        });
}

function initNewWorkFormValidate(){
    $('#newWorkForm')
        .formValidation({
            framework: 'bootstrap',

            fields: {
                workName: {
                    validators: {
                        notEmpty: {
                            message: '请输入作品名称'
                        }
                    }
                },
                workCover:{
                    validators: {
                        notEmpty: {
                            message: '请选择作品封面'
                        },
                        file: {
                            extension: 'jpeg,jpg,png,bmp',
                            maxSize: 2097152,   // 2 * 1024 * 1024 2M
                            type: 'image/jpeg,image/png,image/bmp',
                            message: '请选择格式为JPG/PNG/BMP的图片，大小不要超过2M'
                        }
                    }
                },
                workPrice:{
                    validators:{
                        notEmpty: {
                            message: '请输入售价'
                        },
                        between: {
                            min: 0,
                            max: 1000000000,
                            inclusive:false,
                            message: '售价需>0'
                        }
                    }
                },
                'workPic[]': {
                    validators: {
                        notEmpty: {
                            message: '请选择作品图片'
                        },
                        file: {
                            extension: 'jpeg,jpg,png,bmp',
                            maxSize: 5242880,   // 5 * 1024 * 1024 5M
                            type: 'image/jpeg,image/png,image/bmp',
                            message: '请选择格式为JPG/PNG/BMP的图片，大小不要超过5M'
                        }
                    }
                },
                workFile:{
                    validators: {
                        notEmpty: {
                            message: '请选择作品文件'
                        },
                        file: {
                            extension: 'zip,rar',
                            maxSize: 524288000,   // 500 * 1024 * 1024 500M
                            type: 'application/x-rar-compressed,application/zip',
                            message: '请选择格式为ZIP/RAR的文件，大小不要超过500M'
                        }
                    }
                }
            }
        });
}