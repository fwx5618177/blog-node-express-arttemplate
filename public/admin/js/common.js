function serializeToJson(form)  {
    var result = {};
    var formData = form.serializeArray();

    formData.forEach( (item) => {
        result[item.name] = item.value;
    });

    console.log('转换完成');
    return result;
}