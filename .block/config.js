let todeploy = [
  { block : "appa9LOSM75p8toZn/blkg3QrSzFrZIbPu7", name : 'xx'},
  { block : "appIxc0TZR1O8hA3f/blkorDAUtv2LfqZw7", name : 'dg11'},
  { block : "appVV6KnfsAP7BXvX/blkPv6xAON6o662lL", name : 'gm'},
  { block : "appGTMiMDQ3ggF9Es/blkhSNEgo0e6Qg5CK", name : 'hk'},
  { block : "appJQ0ZWkfPIOlUvV/blkYVsxEYBgjm5WfO", name : 'kk'},
  { block : "appa9LOSM75p8toZn/blkMoeR4mnl6W7snX", name : 'nc2'},
  { block : "appA6PaIAon8G4KFA/blkhR4KdkIOMBvwWO", name : 'ss'},
  { block : "appv8iDAF4n1TiomO/blkWcpSAZTU4Gw2Ir", name : 'js'},
  { block : "appeTTkRDTQGu6ZRN/blkSpbQJn84vx5RPG", name : 'nk'},
  { block : "appOw5y2BOFNM6y98/blkE2pYevMoDykb5M", name : 'as10'},
  { block : "appLQPwsa0S5jj3aP/blkjY4ZffnRPvpJHW", name : 'it'},
  { block : "appsYuyGssNyM7ssC/blkrnJXEfVnvTxdTN", name : 'yg'},
  { block : "appLQPwsa0S5jj3aP/blkjY4ZffnRPvpJHW", name : 'it'},
  { block : "appdBO1dBRbti6tBX/blkKT3DUDIFfLlYSe", name : 'be'},
  { block : "appGwiAwm3pHCYfPQ/blkURDfE11gImtb8l", name : 'sa'},

]


const log = console.log

for ( let block of todeploy){
  log(`block add-remote ${block.block} ${block.name}`)
}

for ( let block of todeploy){
  //log(`block run --remote ${block.name}`)
}



for ( let block of todeploy){
  log(`block release --remote ${block.name}`)
}

/*


block add-remote appa9LOSM75p8toZn/blkg3QrSzFrZIbPu7 xx
block add-remote appIxc0TZR1O8hA3f/blkorDAUtv2LfqZw7 dg11
block add-remote appVV6KnfsAP7BXvX/blkPv6xAON6o662lL gm
block add-remote appGTMiMDQ3ggF9Es/blkhSNEgo0e6Qg5CK hk
block add-remote appJQ0ZWkfPIOlUvV/blkYVsxEYBgjm5WfO kk
block add-remote appa9LOSM75p8toZn/blkMoeR4mnl6W7snX nc2
block add-remote appA6PaIAon8G4KFA/blkhR4KdkIOMBvwWO ss
block add-remote appv8iDAF4n1TiomO/blkWcpSAZTU4Gw2Ir js
block add-remote appeTTkRDTQGu6ZRN/blkSpbQJn84vx5RPG nk
block add-remote appOw5y2BOFNM6y98/blkE2pYevMoDykb5M as10
block add-remote appLQPwsa0S5jj3aP/blkjY4ZffnRPvpJHW it
block add-remote appsYuyGssNyM7ssC/blkrnJXEfVnvTxdTN yg
block add-remote appLQPwsa0S5jj3aP/blkjY4ZffnRPvpJHW it
block add-remote appsYuyGssNyM7ssC/blkrnJXEfVnvTxdTN yg

block add-remote appdBO1dBRbti6tBX/blkKT3DUDIFfLlYSe be
block add-remote appGwiAwm3pHCYfPQ/blkURDfE11gImtb8l sa

block release --remote xx
block release --remote dg11
block release --remote gm
block release --remote hk
block release --remote kk
block release --remote nc2
block release --remote ss
block release --remote js
block release --remote nk
block release --remote as10
block release --remote it
block release --remote yg
block release --remote it
block release --remote yg

block release --remote be
block release --remote sa











*/
