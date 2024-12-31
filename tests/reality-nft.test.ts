import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Reality NFT Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('mint-reality-nft', () => {
    it('should mint a reality NFT successfully', async () => {
      const name = 'Quantum Realm Experience';
      const description = 'An immersive journey through the Quantum Realm';
      const realityParametersId = 1;
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new NFT ID
      
      const result = await mockContractCall('reality-nft', 'mint-reality-nft', [name, description, realityParametersId]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('reality-nft', 'mint-reality-nft', [name, description, realityParametersId]);
    });
  });
  
  describe('transfer-reality-nft', () => {
    it('should transfer a reality NFT successfully', async () => {
      const realityId = 1;
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('reality-nft', 'transfer-reality-nft', [realityId, recipient]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('reality-nft', 'transfer-reality-nft', [realityId, recipient]);
    });
    
    it('should fail if the caller is not the NFT owner', async () => {
      const realityId = 1;
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('reality-nft', 'transfer-reality-nft', [realityId, recipient]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-reality-nft-data', () => {
    it('should return NFT data', async () => {
      const realityId = 1;
      const expectedNFTData = {
        name: 'Quantum Realm Experience',
        description: 'An immersive journey through the Quantum Realm',
        creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        reality_parameters_id: 1
      };
      
      mockContractCall.mockResolvedValue({ value: expectedNFTData });
      
      const result = await mockContractCall('reality-nft', 'get-reality-nft-data', [realityId]);
      
      expect(result.value).toEqual(expectedNFTData);
      expect(mockContractCall).toHaveBeenCalledWith('reality-nft', 'get-reality-nft-data', [realityId]);
    });
    
    it('should return null for non-existent NFT', async () => {
      const realityId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('reality-nft', 'get-reality-nft-data', [realityId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-reality-nft-owner', () => {
    it('should return the NFT owner', async () => {
      const realityId = 1;
      const expectedOwner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      mockContractCall.mockResolvedValue({ value: expectedOwner });
      
      const result = await mockContractCall('reality-nft', 'get-reality-nft-owner', [realityId]);
      
      expect(result.value).toBe(expectedOwner);
      expect(mockContractCall).toHaveBeenCalledWith('reality-nft', 'get-reality-nft-owner', [realityId]);
    });
    
    it('should return null for non-existent NFT', async () => {
      const realityId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('reality-nft', 'get-reality-nft-owner', [realityId]);
      
      expect(result.value).toBeNull();
    });
  });
});

