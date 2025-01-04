const loadPhones = async (inputText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones)
    const phoneContainerBox = document.getElementById('phone-conatiner');

    //clear the phone container card before adding new search text
    phoneContainerBox.textContent = '';

    //display show all btn if more then 12
    const showAllBtn = document.getElementById('show-all-btn');
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden')
    }
    else{
        showAllBtn.classList.add('hidden')
    }

    //display 12 phone is not 12 phone
if(!isShowAll){
    phones = phones.slice(0,12);
}

    phones.forEach(phone =>{
        // console.log(phone)
        const phoneDivBox = document.createElement('div');
        phoneDivBox.classList = `card card-compact bg-base-100 my-4 shadow-xl border-2 border-[#CFCFCF]`
        phoneDivBox.innerHTML = `
            <figure class="bg-[#0D6EFD0D] p-8">
                <img src="${phone.image}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="font-bold text-2xl text-center">${phone.phone_name}</h2>
                <p class="text-lg text-center">There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions justify-center">
                    <button onclick = "showMoreDetails('${phone.slug}')" class="btn bg-[#0D6EFD] hover:bg-[#0c2d5f] text-white text-xl my-5">Show More Details</button>
                </div>
            </div>
        `;
        phoneContainerBox.appendChild(phoneDivBox)
    });
    //hide toggle spinner
    toggleSpinner(false);
}

//show details btn funtion
const showMoreDetails = async(id) =>{
    //load modal data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
}
const showPhoneDetails = (phone) =>{
    console.log(phone);
    // show more details modals info
    const showMoreDetailsModal = document.getElementById('show-more-details-modal');
    showMoreDetailsModal.innerHTML= `
        <div class="bg-[#0D6EFD0D] p-8 flex justify-center"><img src="${phone.image}" alt="Shoes" /></div>
        <h2 class="font-bold text-2xl text-center">${phone.name}</h2>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p><b>Storage:</b> ${phone.mainFeatures.storage}</p>
        <p><b>Chipest</b> ${phone.mainFeatures.chipset}</p>
        <p><b>Memory:</b> ${phone.mainFeatures.memory}</p>
        <p><b>Release Date:</b> ${phone.releaseDate}</p>
        <p><b>Brand:</b> ${phone.brand}</p>
        <p><b>GPS:</b> ${phone.others.GPS}</p>
    `
    show_modal_details.showModal()
}

//Handle search button
const handleSearch = (isShowAll) =>{
    toggleSpinner(true);
    const inputBox = document.getElementById('input-box');
    const inputText = inputBox.value;
    loadPhones(inputText, isShowAll);
}

const toggleSpinner = (isSpinning) =>{
    const spinnerId = document.getElementById('spinner-id');
    if(isSpinning){
        spinnerId.classList.remove('hidden')
    }
    else{
        spinnerId.classList.add('hidden')
    }
}

//show all handle function
const handleShowAll = () => {
    handleSearch(true);
    console.log('ok')
}

loadPhones()