
function OwnerInfo({ownerInfo}){

    return (
        <div className="item-center content-center ">
            <div className="flex mt-3  flex-col space-y-1.5">
                <span className="flex items-center font-bold mb-3 text-gray-800">Owner Information :</span>
                <input type="text" className="bg-gray-100 rounded-lg h-10 pl-3.5 border-2 border-black" name="ownerName"
                       defaultValue={ownerInfo?.ownerName || ""} placeholder="Name" />
                <input type="email" className="bg-gray-100 rounded-lg h-10 pl-3.5 border-2 border-black" name="ownerEmail"
                       defaultValue={ownerInfo?.ownerEmail || ""} placeholder="Email" />
                <input type="text" className="bg-gray-100 rounded-lg h-10 pl-3.5 border-2 border-black" name="contactNumber"
                       defaultValue={ownerInfo?.contactNumber || ""} placeholder="Number" />
                <input type="text" className="bg-gray-100 rounded-lg h-10 pl-3.5 border-2 border-black" name="ownerAddress"
                       defaultValue={ownerInfo?.ownerAddress || ""} placeholder="Address" />
            </div>
        </div>
    );
}

export default OwnerInfo;