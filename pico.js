-- init
function _init()
    game = true
    player = {
        sp=0,
        x=8,
        y=8,
        ox=0,  -- sub-tile position
        oy=0,
        dx=0,  -- movement direction
        dy=0,
        w=8,
        h=8,
        speed=1.5,
        bombs_placed=0,
        max_bombs=1,
        bomb_power=2,
        lives=3,
        invincible=0
    }
    
    bombs={}
    fires={}
    flag_solid=0  -- updated flags
    flag_break=1
    current_frame=0
    
    enemies={
        {
            x=64, y=64,
            w=8, h=8,
            speed=0.8,
            move_timer=0,
            dir={x=0,y=0},
            sp=8
        }
    }
end

-- update
function _update()
    if game then
        current_frame += 1
        
        -- update systems
        player_update()
        bombs_update()
        fire_update()
        enemies_update()
        
        -- invincibility
        if player.invincible > 0 then
            player.invincible -= 1
        end
        
        -- game over check
        if player.lives <= 0 then
            game = false
        end
    elseif btnp(5) then
        _init()
    end
end

-- draw
function _draw()
    cls()
    if game then
        map(0,0)
        spr(player.sp, player.x, player.y, 1, 1)
        draw_bombs()
        draw_fires()
        draw_enemies()
        print("lives: "..player.lives, 90, 2, 8)
    else
        print("game over", 48, 60, 7)
        print("press x to restart", 32, 72, 7)
    end
end

-- player system
function player_update()
    -- get input
    local input_x = btn(1) and 1 or btn(0) and -1 or 0
    local input_y = btn(3) and 1 or btn(2) and -1 or 0
    
    -- update direction
    if input_x ~= 0 then
        player.dx = input_x
        player.dy = 0
        player.sp = input_x == 1 and 1 or 2
    elseif input_y ~= 0 then
        player.dy = input_y
        player.dx = 0
        player.sp = input_y == 1 and 0 or 3
    end
    
    -- calculate new position
    local new_ox = player.ox + player.dx * player.speed
    local new_oy = player.oy + player.dy * player.speed
    
    -- grid-aligned movement with collision
    if player.dx ~= 0 then
        local next_x = player.x + player.dx
        if not cell_is_solid(next_x, player.y) then
            if math.abs(new_ox) >= 4 then
                player.x = next_x
                new_ox = (4 - math.abs(new_ox - 4 * player.dx)) * -player.dx
            end
            player.ox = new_ox
        else
            player.dx = 0
        end
    else
        local next_y = player.y + player.dy
        if not cell_is_solid(player.x, next_y) then
            if math.abs(new_oy) >= 4 then
                player.y = next_y
                new_oy = (4 - math.abs(new_oy - 4 * player.dy)) * -player.dy
            end
            player.oy = new_oy
        else
            player.dy = 0
        end
    end
    
    -- bomb placement
    if btnp(4) and player.bombs_placed < player.max_bombs then
        place_bomb()
    end
end

-- bomb system
function place_bomb()
    local grid_x = flr((player.x + 4) / 8)
    local grid_y = flr((player.y + 4) / 8)
    
    if not cell_is_solid(grid_x, grid_y) then
        add(bombs, {
            x=grid_x * 8,
            y=grid_y * 8,
            grid_x=grid_x,
            grid_y=grid_y,
            timer=180,
            power=player.bomb_power
        })
        player.bombs_placed += 1
        sfx(0)
    end
end

function bombs_update()
    for bomb in all(bombs) do
        bomb.timer -= 1
        if bomb.timer <= 0 then
            explode_bomb(bomb)
            del(bombs, bomb)
            player.bombs_placed -= 1
        end
    end
end

function explode_bomb(bomb)
    local directions = {
        {dx=1, dy=0, end_spr=8},   -- right
        {dx=-1, dy=0, end_spr=9},  -- left
        {dx=0, dy=1, end_spr=10},  -- down
        {dx=0, dy=-1, end_spr=11}  -- up
    }
    
    -- center explosion
    create_fire(bomb.grid_x, bomb.grid_y, 5, 30)
    
    -- directional explosions
    for _,dir in ipairs(directions) do
        for i=1,bomb.power do
            local tx = bomb.grid_x + dir.dx*i
            local ty = bomb.grid_y + dir.dy*i
            
            -- stop at solid walls
            if cell_is_solid(tx, ty) then break end
            
            -- destroy breakables and spawn powerups
            if cell_is_breakable(tx, ty) then
                mset(tx, ty, 0)
                if rnd(100) < 30 then  -- 30% powerup chance
                    mset(tx, ty, 80 + flr(rnd(3)))  -- 80=power, 81=speed, 82=bomb
                end
                create_fire(tx, ty, 7, 15)
            end
            
            -- add fire segment
            local spr = (i == bomb.power) and dir.end_spr or 7
            create_fire(tx, ty, spr, 30)
        end
    end
end

-- fire system
function create_fire(x, y, type, timer)
    if not cell_is_solid(x, y) then
        add(fires, {
            x=x*8, y=y*8,
            type=type,
            timer=timer
        })
    end
end

function fire_update()
    for fire in all(fires) do
        fire.timer -= 1
        
        -- player collision
        if collision_check(player.x, player.y, 8, 8, fire.x, fire.y, 8, 8)
        and player.invincible <= 0 then
            player.lives -= 1
            player.invincible = 90  -- 1.5 seconds
            sfx(1)
        end
        
        -- enemy collision
        for enemy in all(enemies) do
            if collision_check(enemy.x, enemy.y, 8, 8, fire.x, fire.y, 8, 8) then
                del(enemies, enemy)
                sfx(2)
            end
        end
        
        if fire.timer <= 0 then
            del(fires, fire)
        end
    end
end

-- enemy system
function enemies_update()
    for e in all(enemies) do
        e.move_timer -= 1
        if e.move_timer <= 0 then
            -- prevent 180 turns
            local forbidden_dir = {x=-e.dir.x, y=-e.dir.y}
            repeat
                e.dir = rnd({{x=1,y=0}, {x=-1,y=0}, {x=0,y=1}, {x=0,y=-1}})
            until e.dir.x != forbidden_dir.x or e.dir.y != forbidden_dir.y
            e.move_timer = 60
        end
        
        local new_x = e.x + e.dir.x * e.speed
        local new_y = e.y + e.dir.y * e.speed
        
        if not enemy_check_collision(e, new_x, new_y) then
            e.x = new_x
            e.y = new_y
        end
        
        if collision_check(player.x, player.y, 8, 8, e.x, e.y, 8, 8) then
            player_hit()
        end
    end
end

function enemy_check_collision(enemy, new_x, new_y)
    -- wall collision
    local tx = flr(new_x/8)
    local ty = flr(new_y/8)
    if cell_is_solid(tx, ty) then
        return true
    end
    
    -- bomb collision
    for bomb in all(bombs) do
        if flr(new_x/8) == bomb.grid_x and flr(new_y/8) == bomb.grid_y then
            return true
        end
    end
    
    return false
end

function player_hit()
    if player.invincible <= 0 then
        player.lives -= 1
        player.invincible = 90
        sfx(0)
    end
end

-- helper functions
function cell_is_solid(x, y)
    return fget(mget(x, y), flag_solid)
end

function cell_is_breakable(x, y)
    return fget(mget(x, y), flag_break)
end

function collision_check(x1,y1,w1,h1, x2,y2,w2,h2)
    return x1 < x2+w2 and x2 < x1+w1 and y1 < y2+h2 and y2 < y1+h1
end

-- drawing
function draw_bombs()
    for bomb in all(bombs) do
        spr(4, bomb.x, bomb.y)
    end
end

function draw_fires()
    for fire in all(fires) do
        spr(fire.type, fire.x, fire.y)
    end
end

function draw_enemies()
    for e in all(enemies) do
        spr(e.sp, e.x, e.y)
    end
end