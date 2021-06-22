pragma solidity ^0.5.6;
pragma experimental ABIEncoderV2;

contract ContentManagement {

    event isDelete (string contentHash, ContentState cState);
    enum ContentState{None, Uploading, Saved, Deleted}
       
    struct ContentMeta{
        string cName;
        string fType;
        string cSize;
        string cHash;
        string cType;
        string cDescription;
        address cOwner;
        uint256 createdDate;
        ContentState state;  // 0: None, 1: Uploading, 2: Saved,  3: Deleted
    }

    struct DownloadCert {
        string contentName;
        string fileType;
        string contentSize;
        string contentHash;
        string contentType;
        string contentDescription;
        string accessLocation;
        string createdTime;
        string storageDID;
        string userDID;
        string endPoint;
        string signature;
    }

    struct IndexMap {
        uint256 contentMetaIndex;
        uint256 downloadCertIndex;
    }

    mapping(address => ContentMeta[]) contentMetas;
    mapping (address => DownloadCert[]) downloadCerts; //address: user, string: fileName
    mapping(address => mapping(string => IndexMap)) indexTable;   // key: File Hash, value: {fileMetaIndex, downloadCertIndex}

    function uploadContentMeta(
        string memory cName,
        string memory fType,
        string memory cSize,
        string memory cHash,
        string memory cType,
        string memory cDesc) public
    {
        if(contentMetas[msg.sender].length == 0){
          contentMetas[msg.sender].push(ContentMeta("null","null","null","null","null","null",0x0000000000000000000000000000000000000000,1,ContentState.None));
          contentMetas[msg.sender].push(ContentMeta({
            cName : cName,
            fType : fType,
            cSize : cSize,
            cHash : cHash,
            cType : cType,
            cDescription : cDesc,
            cOwner : msg.sender,
            createdDate : now,
            state: ContentState.Uploading
        }));
        }

        else(contentMetas[msg.sender].push(ContentMeta({
            cName : cName,
            fType : fType,
            cSize : cSize,
            cHash : cHash,
            cType : cType,
            cDescription : cDesc,
            cOwner : msg.sender,
            createdDate : now,
            state: ContentState.Uploading
        }))
        );


        indexTable[msg.sender][cHash] =  IndexMap({
            contentMetaIndex: contentMetas[msg.sender].length-1,
            downloadCertIndex: 0
        });
    }

    function storeDownloadCert(
        string memory cHash,
        string memory accessLocation,
        string memory storageDID,
        string memory userDID,
        string memory createdTime,
        string memory endPoint,
        string memory signature) public
    {
        uint256 index = indexTable[msg.sender][cHash].contentMetaIndex; //1, 2, 3 ...
        
        if(downloadCerts[msg.sender].length == 0){
          downloadCerts[msg.sender].push(DownloadCert("null","null","null","null","null","null","null","null","null","null","null","null"));
          downloadCerts[msg.sender].push(DownloadCert({
            contentName: contentMetas[msg.sender][index].cName,
            fileType: contentMetas[msg.sender][index].fType,
            contentSize: contentMetas[msg.sender][index].cSize,
            contentHash: contentMetas[msg.sender][index].cHash,
            contentType: contentMetas[msg.sender][index].cType,
            contentDescription: contentMetas[msg.sender][index].cDescription,
            accessLocation: accessLocation,
            createdTime: createdTime,
            storageDID: storageDID,
            userDID: userDID,
            endPoint: endPoint,
            signature: signature
        }));
        }
        
        else(downloadCerts[msg.sender].push(DownloadCert({
            contentName: contentMetas[msg.sender][index].cName,
            fileType: contentMetas[msg.sender][index].fType,
            contentSize: contentMetas[msg.sender][index].cSize,
            contentHash: contentMetas[msg.sender][index].cHash,
            contentType: contentMetas[msg.sender][index].cType,
            contentDescription: contentMetas[msg.sender][index].cDescription,
            accessLocation: accessLocation,
            createdTime: createdTime,
            storageDID: storageDID,
            userDID: userDID,
            endPoint: endPoint,
            signature: signature
        }))
        );
        
        indexTable[msg.sender][cHash].downloadCertIndex = downloadCerts[msg.sender].length-1; //1, 2, 3 ...
        contentMetas[msg.sender][index].state = ContentState.Saved;
        
    }

    function deleteContentstate(string memory cHash) public {
        uint256 uploadContentLen = contentMetas[msg.sender].length;
        for(uint i=0; i<uploadContentLen ; i++){
            if (keccak256(abi.encodePacked(cHash)) == keccak256(abi.encodePacked(contentMetas[msg.sender][i].cHash))){
                contentMetas[msg.sender][i].state = ContentState.Deleted;
                emit isDelete(cHash, contentMetas[msg.sender][i].state);
            }
        }
    }
    
    function previewContents(address sender) public view returns (ContentMeta[] memory){
        return contentMetas[sender];
    }

    function getDownloadCert(string memory cHash) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory){
        uint256 index = indexTable[msg.sender][cHash].downloadCertIndex;
        return (
            downloadCerts[msg.sender][index].contentName,
            downloadCerts[msg.sender][index].fileType,
            downloadCerts[msg.sender][index].contentSize,
            downloadCerts[msg.sender][index].contentHash,
            downloadCerts[msg.sender][index].contentType,
            downloadCerts[msg.sender][index].contentDescription,
            downloadCerts[msg.sender][index].accessLocation,
            downloadCerts[msg.sender][index].createdTime,
            downloadCerts[msg.sender][index].storageDID,
            downloadCerts[msg.sender][index].userDID,
            downloadCerts[msg.sender][index].endPoint,
            downloadCerts[msg.sender][index].signature);
    }
}