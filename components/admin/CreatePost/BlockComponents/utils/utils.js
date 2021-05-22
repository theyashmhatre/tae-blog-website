export const swapElement = (index, setBlocks, action) => {
    
    setBlocks(array => {
        let data = [...array];
        let temp = data[index];
        let prev = data[index - 1];
        let next = data[index + 1];
        
        if (action === "up" && index >= 2){
            data[index - 1] = temp;
            data[index] = prev;
        }
        if (action === "down" && data.length > index + 1) {
            data[index + 1] = temp;
            data[index] = next;
        }
        localStorage.setItem('componentList', JSON.stringify(data));
        return data;
    });

}

export function handleChange(event, blockValue,setBlockValue) {
    const value = event.target.value;
    setBlockValue({
        ...blockValue,
        [event.target.name]: value
    });
}

export function hasExtension(inputID, exts) {
    var fileName = document.getElementById(inputID).value;
    console.log(fileName);
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
}